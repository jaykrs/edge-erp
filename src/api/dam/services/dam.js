'use strict';

/**
 * dam service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dam.dam');
