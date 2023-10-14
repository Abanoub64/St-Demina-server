const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Boys = require("./modules/boys");
const cors = require("cors");
const BoysRoutes = require("./routes/boysRoutes");

const app = express();
app.use(cors({
  origin: 'https://st-demiana-client.vercel.app',
  credentials: true
}));

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
