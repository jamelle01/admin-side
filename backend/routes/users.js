const express = require("express"); // MERN Mongodb Express Reactjs Node.js
// const Workout = require('../models/workoutModel');

const router = express.Router(); //

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

// GET all
router.get("/", getUsers);

// GET single
router.get("/:id", getUser);

// const upload = multer({storage: storage});
router.post("/", createUser);

// DELETE a workout
router.delete("/:id", deleteUser);

// PATCH a workout
router.patch("/:id", updateUser);

module.exports = {
  router,
};
