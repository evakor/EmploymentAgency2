const express = require('express');

const router = express.Router();
const submitionController = require('../controllers/submitionController.js');

router.post('/submition/', submitionController.create);

router.get('/submition/:id', submitionController.getById);

router.get('/submitions/', submitionController.getAll);

router.put('/submition/:id', submitionController.updateById);

router.delete('/submition/:id', submitionController.deleteById);

module.exports = router;