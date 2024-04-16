const express = require('express');

const router = express.Router();
const employerController = require('../controllers/employerController.js');

router.post('/employer/', employerController.create);

router.get('/employer/:id', employerController.getById);

router.get('/employers/', employerController.getAll);

router.put('/employer/:id', employerController.updateById);

router.delete('/employer/:id', employerController.deleteById);

module.exports = router;