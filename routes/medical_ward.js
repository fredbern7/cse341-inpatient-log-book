const express = require('express');
const router = express.Router();
const usercheck = require("../middlewares/authenticate");
const medicallog = require('../controllers/medical_ward');

router.get('/', usercheck.isAuthenticated, medicallog.getAll);
router.get('/:id', usercheck.isAuthenticated, medicallog.getOne);
router.post('/', usercheck.isAuthenticated, medicallog.createLog);
router.put('/:id', usercheck.isAuthenticated, medicallog.updateLog);
router.delete('/:id', usercheck.isAuthenticated, medicallog.deleteLog);

module.exports = router;