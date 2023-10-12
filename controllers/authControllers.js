const UserModel = require("../modules/user");
const jwt = require("jsonwebtoken");
const BoysModle = require("../modules/boys");

const test = (req, res) => {
  res.json("test is OK");
  console.log("Workingggg");
};
//register

const addboy = async (req, res) => {
  const { name, email, password } = req.body;
  const boy = await BoysModle.create({
    name,
    email,
    password,
  });
  return res.json(boy);
};

const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exist
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // compare the password from the request with the password stored in the database
    const isPasswordValid = await user.isPasswordValid(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // if user is found and password is valid, create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = { test, registeruser, loginUser, addboy };
