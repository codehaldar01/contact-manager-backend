
const express = require('express');
const { currentUser, userLogin, userRegister } = require('../Controllers/usersController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/currentUser').get(validateToken, currentUser)

module.exports = router;