const express = require('express');
// const Workout = require('../models/workoutModel');

const User = require('../models/userModel');
const fs = require('fs')

const router = express.Router();
const {
  getUsers,
  getUser,
  // createUser,
  deleteUser,
  updateUser
} = require('../controllers/userController');

// //multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // get d destanition 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // xtend d name 
    }
});

const upload = multer({storage: storage});

// GET all 
router.get('/', getUsers); 

// GET single 
router.get('/:id', getUser);

// POST a new workout
router.post('/',upload.single('testImage'), async (req, res) => {
  console.log('heefeijf')
  const obj = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    img: {
      data: fs.readFileSync('uploads/' + req.file.filename),
      contentType:"image/png"
    }
  }

  console.log(obj.name);

  try {
    const user = await User.create({
      
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// DELETE a workout
router.delete('/:id', deleteUser);

// PATCH a workout 
router.patch('/:id', updateUser);

module.exports = {
  router,
  storage
};