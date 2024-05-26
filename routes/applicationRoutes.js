const express = require('express');

const router = express.Router();
const applicationController = require('../controllers/applicationController.js');
const version = "v1";

router.post(`/${version}/application`, applicationController.create);

router.get(`/${version}/application/:id`, applicationController.getById);

router.get(`/${version}/application/byJobId/:id`, applicationController.getApplicantsByJobId);

router.get(`/${version}/application/byUserId/:id`, applicationController.getByUserId);

router.get(`/${version}/applications`, applicationController.getAll);

router.put(`/${version}/application/:id`, applicationController.updateById);

router.delete(`/${version}/application/:id`, applicationController.deleteById);

router.get(`/${version}/application/count/byJobId/:id`, applicationController.countApplicationsByJobId);



module.exports = router;