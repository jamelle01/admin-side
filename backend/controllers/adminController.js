//import from admin model
const Admin = require("../models/adminModel");

// import token used to authenticate users and authorize access to protected resources
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "8h" });
};

// login a admin
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.login(username, password);
    // create a token
    const token = createToken(admin._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a admin
const signupUser = async function (req, res) {
  const { username, password } = req.body;

  try {
    const admin = await Admin.signup(username, password);

    // create a token
    const token = createToken(admin._id);

    res.status(200).json({ username, token });
  } catch (error) {
    console.log('this error')
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
