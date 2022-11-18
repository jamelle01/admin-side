const User = require('../models/userModel');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const fs = require('fs')
var path = require('path'); 
var cloudinary = require('cloudinary').v2;


// const {storage} = require('../routes/users');

// const path = require('path');

// get all 
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1});

    res.status(200).json(users);
}

// get a single
const getUser = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'});
    }

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user);
}

// create new
const createUser = async (req, res) => {
  
  console.log('heefeijf');

  const {
    name, 
    username,
    password, 
    image
  } = req.body;
 let emptyFields = [] //for empty checks

  if(!name){
    emptyFields.push('name');
  }
  if(!username){
    emptyFields.push('username');
  }
  if(!password){
    emptyFields.push('password');
  }
  if(emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
  }
  cloudinary.uploader.upload(image,{
    folder: "photos"
  })
  .then((result) => {
    console.log("uploaded")
    const obj = new User({
      name,
      username,
      password,
      img: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });
  
    User.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
      }
    });
  })
  .catch ((error) => {
    res.status(400).json({error: error.message});
  })

  console.log('done')

  // // const {name, username, password} = req.body;

  // const obj = {
  //   name: req.body.name,
  //   username: req.body.username,
  //   password: req.body.password,
  //   img: {
  //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //     contentType: "image/png"
  //   }
  // }

  // console.log(obj.name);

  // let emptyFields = [] //for empty checks

  // // if(!name){
  // //   emptyFields.push('name');
  // // }
  // // if(!username){
  // //   emptyFields.push('username');
  // // }
  // // if(!password){
  // //   emptyFields.push('password');
  // // }
  // // if(emptyFields.length > 0){
  // //   return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
  // // }

  // // add doc to db
  // try {
  //   const user = await User.create(obj);
  //   res.status(200).json(user);
  // } catch (error) {
  //   console.log('heloo')
  //   res.status(400).json({error: error.message});
  // }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params
  
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such user'});
    }
  
    const user = await User.findOneAndDelete({_id: id});
  
    if(!user) {
      return res.status(400).json({error: 'No such user'});
    }
  
    res.status(200).json(user);
  }
  

// update
const updateUser = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such user'});
    }
  
    const user = await User.findOneAndUpdate({_id: id}, {
      ...req.body
    });
  
    if (!user) {
      return res.status(400).json({error: 'No such user'});
    }
  
    res.status(200).json(user);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
  }