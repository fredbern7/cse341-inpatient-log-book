const express = require('express');
const router = express.Router();

const check = require('../middlewares/validator');
const isExist = require('../middlewares/duplicate')
const user = require('../controllers/user');

router.get('/', user.getAll);
router.get('/:id', user.getOne);
router.post('/', check.validateUser, isExist.usernameEmail, user.createUser);
router.put('/:id', check.validateUser, isExist.updateUserEmail, user.updateUser);
router.delete('/:id', user.deleteUser);

module.exports = router;