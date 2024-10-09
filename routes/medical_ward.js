const express = require('express');
const router = express.Router();

const medicallog = require('../controllers/medical_ward');

router.get('/', medicallog.getAll);
router.get('/:id', medicallog.getOne);
router.post('/', medicallog.createLog);
router.put('/:id', medicallog.updateLog);
router.delete('/:id', medicallog.deleteLog);

module.exports = router;