const { createCoreService } = require('@strapi/strapi').factories;
const Mailjet = require('node-mailjet');

module.exports = createCoreService('api::emailworkflow.emailworkflow', ({ strapi }) => ({

    async sendWorkflow(id, force = false) {
        try {
            const workflow = await strapi.entityService.findOne('api::emailworkflow.emailworkflow', id);
            if (!workflow || (workflow.execute && !force)) {
                return;
            }

            strapi.log.info(`Executing workflow: ${workflow.name}`);

            // 1. Initialize Mailjet 
            const mailjet = new Mailjet.Client({
                apiKey: process.env.MAILJET_API_KEY,
                apiSecret: process.env.MAILJET_API_SECRET
            });

            // 2. Fetch Template
            const template = await strapi.entityService.findOne('api::template.template', workflow.templateid);
            if (!template) {
                throw new Error(`Template with ID ${workflow.templateid} not found.`);
            }

            // 3. Fetch Recipient List
            const recipientListEntry = await strapi.entityService.findOne('api::recepientlist.recepientlist', workflow.recepientlistid);
            if (!recipientListEntry) {
                throw new Error(`Recipient list with ID ${workflow.recepientlistid} not found.`);
            }

            let recipients = recipientListEntry.collection;
            if (typeof recipients === 'string') {
                try {
                    recipients = JSON.parse(recipients);
                } catch (e) {
                    throw new Error('Recipient list collection is not valid JSON.');
                }
            }

            if (!Array.isArray(recipients) || recipients.length === 0) {
                throw new Error('Recipient list is empty or invalid.');
            }

            // Ensure recipients are strings for type safety
            const recipientEmails = recipients.filter(r => typeof r === 'string');

            // 4. Merge Template
            let htmlContent = template.html_element || '';
            let baseSubject = workflow.name || '';
            const jsonData = template.json || {};

            // Replace $key with values from json
            // Sort keys by length descending to prevent partial replacement (e.g., $llm-intro before $llm)
            Object.keys(jsonData)
                .sort((a, b) => b.length - a.length)
                .forEach(key => {
                    const regex = new RegExp(`\\$${key}`, 'g');
                    htmlContent = htmlContent.replace(regex, String(jsonData[key]));
                    baseSubject = baseSubject.replace(regex, String(jsonData[key]));
                });

            // 5. Fetch Student Names for Dynamic Replacement
            const students = await strapi.entityService.findMany('api::student.student', {
                filters: { email: { $in: recipientEmails } }
            });
            const studentMap = (students || []).reduce((acc, student) => {
                acc[student.email] = student.name;
                return acc;
            }, {});

            // 6. Send Emails via Mailjet
            const messages = recipientEmails.map(email => {
                const studentName = studentMap[email] || email; // Fallback to email if name not found
                const personalizedHtml = htmlContent.replace(/\$user_username/g, studentName);
                const personalizedSubject = baseSubject.replace(/\$user_username/g, studentName);

                return {
                    From: {
                        Email: 'edgeapp@teqtoeducation.com',
                        Name: 'edgeapp'
                    },
                    To: [{ Email: email }],
                    Subject: personalizedSubject,
                    HTMLPart: personalizedHtml
                };
            });

            const result = await mailjet.post("send", { version: 'v3.1' }).request({
                Messages: messages
            });

            strapi.log.debug(`Mailjet response: ${JSON.stringify(result.body)}`);

            // 7. Update Workflow Status
            const responseBody = result.body || {};
            const messagesList = responseBody['Messages'] || [];
            const executionlog = (Array.isArray(messagesList) ? messagesList : []).map(msg => ({
                email: msg.To[0].Email,
                templateid: workflow.templateid,
                status: msg.Status
            }));

            await strapi.entityService.update('api::emailworkflow.emailworkflow', workflow.id, {
                data: {
                    execute: true,
                    executionlog
                }
            });

            strapi.log.info(`Successfully executed workflow: ${workflow.name}`);

        } catch (error) {
            strapi.log.error(`Failed to process workflow ${id}: ${error.message}`);

            await strapi.entityService.update('api::emailworkflow.emailworkflow', id, {
                data: {
                    executionlog: {
                        status: 'error',
                        error: error.message,
                        executedAt: new Date().toISOString()
                    }
                }
            });
        }
    }
}));
