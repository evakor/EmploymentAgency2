const express = require('express');

const router = express.Router();
const submitionController = require('../controllers/submitionController.js');
const version = "v1";

router.post(`/${version}/submition`, submitionController.create);

router.get(`/${version}/submition/:id`, submitionController.getById);

router.get(`/${version}/submitions/byUserId/:id`, submitionController.getByUserId);

router.get(`/${version}/submitions`, submitionController.getAll);

router.put(`/${version}/submition/:id`, submitionController.updateById);

router.delete(`/${version}/submition/:id`, submitionController.deleteById);

router.get(`/${version}/submition/getEmployerEmail/:id`,submitionController.getEmployerEmailByJobId);

module.exports = router;