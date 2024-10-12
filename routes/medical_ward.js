const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authenticate");
const medicallog = require('../controllers/medical_ward');

router.get('/', isAuthenticated, medicallog.getAll);
router.get('/:id', isAuthenticated, medicallog.getOne);
router.post('/', isAuthenticated, medicallog.createLog);
router.put('/:id', isAuthenticated, medicallog.updateLog);
router.delete('/:id', isAuthenticated, medicallog.deleteLog);

module.exports = router;