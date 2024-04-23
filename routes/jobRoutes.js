const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController.js');
const version = "v1";

// Define routes
router.post(`/${version}/job`, jobController.create);
router.get(`/${version}/jobs`, jobController.getAll); // Update route here
router.get(`/${version}/jobs/latest`, jobController.getLatest);
router.get(`/${version}/job/:id`, jobController.getById);
router.put(`/${version}/job/:id`, jobController.updateById);
router.delete(`/${version}/job/:id`, jobController.deleteById);

module.exports = router;
