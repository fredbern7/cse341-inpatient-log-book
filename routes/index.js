const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/medical-ward', require('./medical_ward'));

module.exports = router;