const mongoos = require("mongoose");
const { Schema } = mongoos;

const userSchema = new Schema({
  name: String,
  father_name: String,
  password: String,
  role: [String],
  acsess: String,
  phone_number: {
    type: String,
    unique: true,
  },
});

// userSchema.statics.login = async function (name, password) {
//   if (!name || !password) {
//     throw Error("All fields must be filled");
//   }

//   const user = await this.findOne({ name });
//   if (!user) {
//     throw Error("Incorrect User");
//   }

//   return user;
// };

const UserModel = mongoos.model("User", userSchema);

module.exports = UserModel;
