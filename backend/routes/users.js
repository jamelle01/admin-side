const express = require('express');
// const Workout = require('../models/workoutModel');

const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require('../controllers/userController');

// GET all 
router.get('/', getUsers);

// GET single 
router.get('/:id', getUser);

// POST a new workout
router.post('/', createUser);

// DELETE a workout
router.delete('/:id', deleteUser);

// PATCH a workout 
router.patch('/:id', updateUser);

module.exports = router;