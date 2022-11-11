const User = require('../models/userModel');
const mongoose = require('mongoose');

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
  const {name, username, password} = req.body;

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

  // add doc to db
  try {
    const user = await User.create({name, username, password});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// delete
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