'use strict';

const logger = require('./winston').logger();

module.exports.init = initModels;

function initModels(app) {
  logger.debug('Initializing %s configs', 'Models');

  const modelsPath = app.get('root') + '/app/models/';

  ['user', 'token'].forEach((model) => {
    require(modelsPath + model);
  });
};
