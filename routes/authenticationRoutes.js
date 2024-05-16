const express = require('express');

const router = express.Router();
const authenticationController = require('../controllers/authenticationController.js');
const version = "v1";

router.get(`/${version}/getUserByEmailAndPassword`, authenticationController.getUserByEmailAndPassword);

module.exports = router;