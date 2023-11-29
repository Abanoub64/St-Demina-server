const mongoose = require("mongoose");
const { Schema } = mongoose;

const familiesSchema = new Schema({
  father: {
    firstname: {
      type: String,
    },
    secondname: {
      type: String,
    },
    thirdname: {
      type: String,
    },
    forthname: {
      type: String,
    },
    educationlevel: String,
    marriagestatus: String,
    illnesses: [String],
    work_type: String,
    anotherfather: {
      marriagestatus: String,
      isit: Boolean,
      reson: String,
      name: String,
      sex: String,
      connection: String,
      phone: [Number],
    },
    jobname: String,
    disability: String,
    isdisable: Boolean,
    income: String,
    phone: Number,
    spending: String,
    medication: [
      {
        name: String,
        source: String,
      },
    ],
    confession: String,
    birthdate: Date,

    idnumber: Number,
    Comment: String,
  },
  mother: {
    firstname: {
      type: String,
    },
    secondname: {
      type: String,
    },
    thirdname: {
      type: String,
    },
    forthname: {
      type: String,
    },
    educationlevel: String,
    marriagestatus: String,
    jobname: String,
    isdisable: Boolean,
    income: String,
    phone: Number,
    spending: String,
    idnumber: Number,
    dateofmarriage: Date,
    birthdate: Date,
    illnesses: [String],
    disability: String,
    work_type: String,
    medication: [
      {
        name: String,
        source: String,
      },
    ],
  },
  location: {
    churchofmarriage: String,
    priestoffamily: String,
    distract: String,
    buildingNo: Number,
    streetNo: String,
    area: String,
    landline: Number,
    apartmentNo: Number,
    floorNo: Number,
    gps: String,
    marks: String,
  },
  Childrenlist: [
    {
      name: String, // <<< head
      sex: String,
      birthdate: Date,
      age_stage: Number,
      educationlevel: String,
      medication: [
        {
          name: String,
          source: String,
        },
      ],
      phone: [Number],
      disability: null || String,
      nameofdisability: null || String,
      confession: String || null,
    },
  ],
});

const FamilyModel = mongoose.model("family", familiesSchema);

module.exports = FamilyModel;
