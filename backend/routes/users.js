const express = require('express');
// const Workout = require('../models/workoutModel');

const router = express.Router();

const bodyParser = require("body-parser");
const cors = require("cors");
const User = require('../models/userModel');
const fs = require('fs')

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const {
  getUsers,
  getUser,        
  // createUser,
  deleteUser,
  updateUser
} = require('../controllers/userController');


// GET all 
router.get('/', getUsers); 

// GET single 
router.get('/:id', getUser);

//multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // get d destanition 
    },
    filename: (req, file, cb) => {
      cb(null,  file.originalname); // xtend d name 
    }
});

const upload = multer({storage: storage});

router.post('/', upload.single('image'), (req, res) => {
  console.log('heefeijf');

  const obj = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    img: {
      data: fs.readFileSync('uploads/' + req.file.filename),
      contentType:"image/png",
    },
  });

  User.create(obj, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
        // item.save();
    }
});
  // try {
  //   const user = await User.create(obj);
  //   res.status(200).json(user);
  // } catch (error) {
  //   res.status(400).json({error: error.message});
  // }

});

// DELETE a workout
router.delete('/:id', deleteUser);

// PATCH a workout 
router.patch('/:id', updateUser);

module.exports = {
  router
};