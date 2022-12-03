const User = require("../models/userModel");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

var path = require("path");
var cloudinary = require("cloudinary").v2;

// get all
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ updatedAt: -1 });

  res.status(200).json(users);
};

// get a single
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// create new router
const createUser = async (req, res) => {
  const { name, username, password, image } = req.body;

  let emptyFields = []; //for empty checksilog
  let message = "";

  console.log(onlyLettersSpacesDots(name));

  const nameExists = await User.findOne({ name });

  if (nameExists) {
    message += "Name already exists.\n";
    emptyFields.push("name");
  }

  if (!onlyLettersSpacesDots(name)) {
    message += "Name should not contain any numbers or symbols.\n";
    emptyFields.push("name");
  }
  if (username.length < 4 ) {
    message +=
      "Username must have atleast 4 letters.\n";
    emptyFields.push("username");
  }
  if (!name) {
    emptyFields.push("name");
    message = "Please fill in the field/s";
  }
  if (!username) {
    emptyFields.push("username");
    message = "Please fill in the field/s";
  }
  if (!password) {
    emptyFields.push("password");
    message = "Please fill in the field/s";
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: message, emptyFields });
  }

  cloudinary.uploader // promise upload sa cloud storage
    .upload(image, {
      folder: `photos/${name}`,
      public_id: "1",
    })
    .then((result) => {
      //UPLOAD SA DATABASE MONGODB
      console.log("uploaded");
      const obj = new User({
        name,
        username,
        password,
        img: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      User.create(obj, (err, item) => {
        if (err) {
          console.log(err);
        } else {
          console.log("done");
          res.status(200).json(obj);
        }
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params; // ID SA USER NA DELETON
  const user = await User.findById(req.params.id); //ID USER
  const imgId = user.img.public_id; // ID SA IMAGE

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  await cloudinary.uploader.destroy(imgId); // delete the image from the cloudstorage
  const rmUser = await User.findByIdAndDelete(req.params.id); // delete data in database

  res.status(200).json(user);
};

function onlyLettersSpacesDots(str) {
  return /^[a-zA-Z\s.]+$/.test(str);
}

// update
const updateUser = async (req, res) => {
  const { name, username, password, image } = req.body;

  let emptyFields = []; //for empty checksilog
  let message = "";

  console.log(onlyLettersSpacesDots(name));
  if (onlyLettersSpacesDots(name) == false) {
    message += "Name should not contain any numbers or symbols.\n";
    emptyFields.push("name");
  }
  if (username.length < 4 ) {
    message +=
      "Username must have atleast 4 letters.\n";
    emptyFields.push("username");
  }
  if (!name) {
    emptyFields.push("name");
    message = "Please fill in the field/s";
  }
  if (!username) {
    emptyFields.push("username");
    message = "Please fill in the field/s";
  }
  if (!password) {
    emptyFields.push("password");
    message = "Please fill in the field/s";
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: message, emptyFields });
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  // promise to upload
  cloudinary.uploader
    .upload(image, {
      folder: `photos/${name}`,
      public_id: "1",
    }) //this return the result of uploading image
    .then(async (result) => {
      // update the database
      console.log("uploaded");
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          name,
          username,
          password,
          img: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        }
      );
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
