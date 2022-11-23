const User = require("../models/userModel");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const fs = require("fs");
var path = require("path");
var cloudinary = require("cloudinary").v2;

// const {storage} = require('../routes/users');

// const path = require('path');

// get all
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

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

// create new
const createUser = async (req, res) => {
  const { name, username, password, image } = req.body;

  let emptyFields = []; //for empty checks

  if (!name) {
    emptyFields.push("name");
  }
  if (!username) {
    emptyFields.push("username");
  }
  if (!password) {
    emptyFields.push("password");
    console.log("passwordemp");
  }
  if (!image) {
    emptyFields.push("image");
    console.log("imgemp");
  }
  if (emptyFields.length > 0) {
    console.log("enter");
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  console.log(image);

  cloudinary.uploader
    .upload(image, {
      folder: `photos/${name}`,
      public_id: "1",
    })
    .then((result) => {
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
          // item.save();
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
  const { id } = req.params;
  const user = await User.findById(req.params.id); //for image
  const imgId = user.img.public_id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  await cloudinary.uploader.destroy(imgId);
  const rmUser = await User.findByIdAndDelete(req.params.id);

  // const user = await User.findOneAndDelete({_id: id});
  if (!rmUser) {
    return "fuct"
  }

  res.status(200).json(user);
};

// update
const updateUser = async (req, res) => {
  const { name, username, password, image } = req.body;

  if (!name) {
    emptyFields.push("name");
  }
  if (!username) {
    emptyFields.push("username");
  }
  if (!password) {
    emptyFields.push("password");
    console.log("passwordemp");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  cloudinary.uploader
    .upload(image, {
      folder: `photos/${name}`,
      public_id: "1",
    })
    .then(async (result) => {
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

  // const user = await User.findOneAndUpdate(
  //   { _id: id },
  //   {
  //     ...req.body,
  //   }
  // );

  // if (!user) {
  //   return res.status(400).json({ error: "No such user" });
  // }

  // res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};