const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const planCtrl = require('../controllers/plan');

router.post('/createPlan', auth, multer, planCtrl.createPlan);

router.get('/', auth, planCtrl.getPlans);

router.get('/:id', auth, planCtrl.getOnePlan);

module.exports = router;