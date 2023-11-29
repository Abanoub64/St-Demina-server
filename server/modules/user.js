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

userSchema.statics.login = async function (name, password) {
  if (!name || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ name });
  if (!user) {
    throw Error("Incorrect Email");
  }

  return user;
};

const UserModel = mongoos.model("User", userSchema);

module.exports = UserModel;
