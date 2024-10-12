const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));


router.use('/user', require('./user'));
router.use('/medical-ward', require('./medical_ward'));

router.ge('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
    register.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;