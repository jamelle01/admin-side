const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
adminSchema.statics.signup = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }
  // if (!validator.isEmail(username)) {
  //   throw Error('Username is not valid')
  // }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await this.create({ username, password: hash });

  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
