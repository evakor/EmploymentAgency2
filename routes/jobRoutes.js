const express = require('express');

const router = express.Router();
const jobController = require('../controllers/jobController.js');

router.post('/job/', jobController.create);

router.get('/job/:id', jobController.getById);

router.get('/jobs/', jobController.getAll);

router.put('/job/:id', jobController.updateById);

router.delete('/job/:id', jobController.deleteById);

module.exports = router;