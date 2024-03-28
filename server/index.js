const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const UsersRoutes = require("../server/routes/usersRoutes");
const DataRoutes = require("./routes/familiesRoutes");

const app = express();

const app = express();
app.use(
  cors({
    origin: "https://st-demiana-client.vercel.app",
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/", UsersRoutes);
app.use("/", DataRoutes);

//connect to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("App is listening to port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
