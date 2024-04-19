const express = require('express');

const router = express.Router();
const jobController = require('../controllers/jobController.js');
const version = "v1";

router.post(`/${version}/job`, jobController.create);

router.get(`/${version}/job/:id`, jobController.getById);

router.get(`/${version}/v1/jobs`, jobController.getAll);

router.put(`/${version}/job/:id`, jobController.updateById);

router.delete(`/${version}/job/:id`, jobController.deleteById);

module.exports = router;