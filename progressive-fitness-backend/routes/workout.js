const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const workoutCtrl = require('../controllers/workout');

router.post('/createWorkout', auth, workoutCtrl.createWorkout);

module.exports = router;