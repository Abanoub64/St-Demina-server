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
    const { father_name, name, phone_number, password, role, acsess } =
      req.body;
    const exist = await UserModel.findOne({ phone_number });
    if (exist) {
      return res.json({
        error: "User already exist",
      });
    }
    //create user

    const user = await UserModel.create({
      father_name,
      name,
      phone_number,
      password,
      role,
      acsess,
    });

    // create token
    const token = createToken(user._id);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { phone_number, password } = req.body;
  try {
    if (!phone_number || !password) {
      return res.status(401).json({ error: "All fields must be filled" });
    }
    const user = await UserModel.findOne({ phone_number });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userdata = {
      name: user.name,
      role: user.role,
      acsess: user.acsess,
    };
    // compare the password from the request with the password stored in the database

    // if user is found and password is valid, create a token
    const token = createToken(user._id);

    return res.status(200).json({ userdata, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = { test, registeruser, loginUser };
