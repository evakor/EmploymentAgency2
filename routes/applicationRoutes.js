const express = require('express');

const router = express.Router();
const applicationController = require('../controllers/applicationController.js');
const version = "v1";

router.post(`/${version}/application`, applicationController.create);

router.get(`/${version}/application/:id`, applicationController.getById);

router.get(`/${version}/applications`, applicationController.getAll);

router.put(`/${version}/application/:id`, applicationController.updateById);

router.delete(`/${version}/application/:id`, applicationController.deleteById);

module.exports = router;