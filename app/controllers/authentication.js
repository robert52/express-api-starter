'use strict';

/**
 *  Module dependencies
 */
const passport = require('passport');
const mongoose = require('mongoose');

/**
 *  Module exports
 */
module.exports.signin = signinUser;
module.exports.signout = signoutUser;
module.exports.basic = basicAuthentication;

/**
 *  Uses Passport's local strategy to sign in a user
 */
function signinUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(400).json(info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).json(user);
    });
  })(req, res, next);
}

function signoutUser(req, res, next) {
  req.logout();
  res.redirect('/');
}

function basicAuthentication(req, res, next) {
  passport.authenticate('basic', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    Token.generate({ user: user.id }, (err, token) => {
      if (err) {
        return next(err);
      }

      if (!token) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      var result = user.toJSON();
      result.token = _.pick(token, ['value', 'expiresAt']);

      res.json(result);
    });

  })(req, res, next);
}
