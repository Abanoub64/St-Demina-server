const express = require("express");
const router = express.Router();
const UserModel = require("../modules/user");
const {
  test,
  registeruser,
  loginUser,
} = require("../controllers/authControllers");

router.post("/signup", registeruser);
router.post("/login", loginUser);

module.exports = router;
