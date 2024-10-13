const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/medicalward', require('./medical_ward'));

router.get('/login', passport.authenticate('github'), (req, rest) => {});

router.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
