const express = require('express');
const router = express.Router();

const exoCtrl = require('../controllers/exo');
const auth = require('../middleware/auth');

router.post('/', auth, exoCtrl.createExo);

module.exports = router;