const express = require('express');

const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

router.post('/employee/', employeeController.create);

router.get('/employee/:id', employeeController.getById);

router.get('/employees/', employeeController.getAll);

router.put('/employee/:id', employeeController.updateById);

router.delete('/employee/:id', employeeController.deleteById);

module.exports = router;