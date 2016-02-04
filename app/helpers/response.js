'use strict';

module.exports.toJSON = sendJSONresponse;

function sendJSONresponse(prop) {
  return function(req, res, next) {
    res.json(req.resources[prop]);
  }
}
