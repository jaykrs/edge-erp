
module.exports = {
  async beforeUpdate(event) {
    const { where } = event.params;

    // Fetch the existing record to check the previous state
    const existing = await strapi.entityService.findOne('api::emailworkflow.emailworkflow', where.id);
    if (existing) {
      event.state = { 
        previousExecute: existing.execute,
        previousPublishedAt: existing.publishedAt
      };
    }
  },

  async afterCreate(event) {
    const { result } = event;

    if (result.execute === true) {
      strapi.log.info(`Immediate trigger detected for NEW workflow: ${result.name}`);
      await strapi.service('api::emailworkflow.emailworkflow').sendWorkflow(result.id, true);
    }
  },

  async afterUpdate(event) {
    const { result, state } = event;

    const wasJustPublished = result.publishedAt && state && !state.previousPublishedAt;
    const wasToggledToTrue = result.execute === true && state && state.previousExecute === false;

    // Trigger if toggled to true OR if published while execute is already true
    if (wasToggledToTrue || (wasJustPublished && result.execute === true)) {
      strapi.log.info(`Manual trigger detected for workflow: ${result.name}`);
      await strapi.service('api::emailworkflow.emailworkflow').sendWorkflow(result.id, true);
    }
  },
};
