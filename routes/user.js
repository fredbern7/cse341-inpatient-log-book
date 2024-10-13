const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authenticate');
const check = require('../middlewares/validator');
const isExist = require('../middlewares/duplicate')
const user = require('../controllers/user');

router.get('/', isAuthenticated, user.getAll);
router.get('/:id', isAuthenticated, user.getOne);
router.post('/', isAuthenticated, check.validateUser, isExist.usernameEmail, user.createUser);
router.put('/:id', isAuthenticated, check.validateUser, isExist.updateUserEmail, user.updateUser);
router.delete('/:id', isAuthenticated, user.deleteUser);

module.exports = router;