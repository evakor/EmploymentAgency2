const express = require('express');

const router = express.Router();
const applicationController = require('../controllers/applicationController.js');

router.post('/application/', applicationController.create);

router.get('/application/:id', applicationController.getById);

router.get('/applications/', applicationController.getAll);

router.put('/application/:id', applicationController.updateById);

router.delete('/application/:id', applicationController.deleteById);

module.exports = router;