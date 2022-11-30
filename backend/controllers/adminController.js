const Admin = require("../models/adminModel");

// login a user
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// signup a user
const signupUser = async function(req, res) {
  const { username, password } = req.body;

  try {
    const admin = await Admin.signup(username, password);

    res.status(200).json({ username, admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
