const mongoos = require("mongoose");
const { Schema } = mongoos;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserModel = mongoos.model("User", userSchema);

module.exports = UserModel;
