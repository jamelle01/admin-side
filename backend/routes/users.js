const express = require('express');
// const Workout = require('../models/workoutModel');

const router = express.Router();



// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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

//multer
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads'); // get d destanition 
//     },
//     filename: (req, file, cb) => {
//       cb(null,  file.originalname); // xtend d name 
//     }
// });

// const upload = multer({storage: storage});

router.post('/', createUser);

// DELETE a workout
router.delete('/:id', deleteUser);

// PATCH a workout 
router.patch('/:id', updateUser);

module.exports = {
  router
};