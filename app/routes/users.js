'use strict';

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/authentication');
const response = require('../helpers/response');

router.get('/users', auth.ensured, userCtrl.getAll, response.toJSON('users'));
router.get('/users/:userId', auth.ensured, userCtrl.findById, response.toJSON('user'));
router.put('/users/:userId', auth.ensured, userCtrl.findById, userCtrl.update, response.toJSON('user'));
router.delete('/users/:userId', auth.ensured, userCtrl.delete);

module.exports = router;
