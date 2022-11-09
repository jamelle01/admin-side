const express = require('express');
// const Workout = require('../models/workoutModel');

const router = express.Router();
const {
    getWorkouts, 
    getWorkout, 
    createWorkout, 
    deleteWorkout, 
    updateWorkout
  } = require('../controllers/workoutController');

// GET all 
router.get('/', getWorkouts);

// GET single 
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// PATCH a workout 
router.patch('/:id', updateWorkout);

module.exports = router;