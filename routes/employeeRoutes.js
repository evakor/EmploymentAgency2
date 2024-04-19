const express = require('express');

const router = express.Router();
const employeeController = require('../controllers/employeeController.js');
const version = "v1";

router.post(`/${version}/employee`, employeeController.create);

router.get(`/${version}/employee/:id`, employeeController.getById);

router.get(`/${version}/employees`, employeeController.getAll);

router.put(`/${version}/employee/:id`, employeeController.updateById);

router.delete(`/${version}/employee/:id`, employeeController.deleteById);

module.exports = router;