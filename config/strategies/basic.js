'use strict';

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = buildBasicStrategy;

function buildBasicStrategy() {
  var basic = new BasicStrategy((username, password, done) => {
    User.authenticate(username, password, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    });
  });

  passport.use('basic', basic);
};
