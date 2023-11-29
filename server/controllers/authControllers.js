const UserModel = require("../modules/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const test = (req, res) => {
  res.json("test is OK");
  console.log("Workingggg");
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SERCRET, { expiresIn: "7d" });
};
//register
const registeruser = async (req, res) => {
  try {
    const { name, password } = req.body;
    // check if name is entarted
    if (!name) {
      return res.json({ error: "name is required" });
    }
    // check if name is ok
    if (!password || password.lenght < 6) {
      return res.json({
        error: "passwrod is required and should be at least 6 char",
      });
    }
    // check eamil
    const exist = await UserModel.findOne({ email });
    console.log(exist);
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }
    //create user
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    // create token
    const token = createToken(user._id);

    return res.json(eamil, token);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await UserModel.login(name, password);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // compare the password from the request with the password stored in the database

    // if user is found and password is valid, create a token
    const token = createToken(user._id);

    return res.status(200).json({ name, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = { test, registeruser, loginUser };
