const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Boys = require("../server/modules/boys");
const cors = require("cors");
const BoysRoutes = require("../server/routes/boysRoutes");

const app = express();

//middleware
app.use(express.json());
app.use("/", BoysRoutes);

//connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("App is listening to port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
