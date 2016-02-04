'use strict';

const logger = require('./winston').logger();

module.exports.init = initModels;

function initModels(app) {
  logger.debug('Initializing %s configs', 'Models');

  let modelsPath = app.get('root') + '/app/models/';

  ['user', 'token'].forEach(function(model) {
    require(modelsPath + model);
  });
};
