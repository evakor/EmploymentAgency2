const express = require('express');

const router = express.Router();
const employerController = require('../controllers/employerController.js');
const version = "v1";

router.post(`/${version}/employer`, employerController.create);

router.get(`/${version}/employer/:id`, employerController.getById);

router.get(`/${version}/employers`, employerController.getAll);

router.put(`/${version}/employer/:id`, employerController.updateById);

router.delete(`/${version}/employer/:id`, employerController.deleteById);

module.exports = router;