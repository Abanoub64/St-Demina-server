const mongoose = require("mongoose");
const { Schema } = mongoose;

const boysSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  adress: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  phone2: {
    type: Number,
  },
  day: {
    type: Number,
  },
  mon: {
    type: Number,
  },
  year: {
    type: Number,
  },
  father: {
    type: String,
  },
  satate: {
    type: String,
  },
});

const BoysModel = mongoose.model("Boys", boysSchema);

module.exports = BoysModel;
