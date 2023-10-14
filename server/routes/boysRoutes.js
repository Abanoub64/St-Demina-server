const express = require("express");
const router = express.Router();
const Boys = require("../modules/boys");
const cors = require("cors");
const UserModel = require("../modules/user");


// GET ALL DATA
router.get("/database", async (req, res) => {
  try {
    const boys = await Boys.find({});
    res.status(200).send(boys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD NEW ENTIRY
router.post("/database", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ Error: "Name is required" });
    }
    const { name, adress, phone, phone2, day, mon, year, father, satate } =
      req.body;
    const newboy = {
      name,
      adress,
      phone,
      phone2,
      day,
      mon,
      year,
      father,
      satate,
    };
    const boy = await Boys.create(newboy);
    console.log(boy);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// GET INFO OF ONE ENTRY
router.get("/database/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exits = await Boys.findById(id);
    if (!exits) {
      return res.status(404).send("No such entry");
    }
    res.status(200).json(exits);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// UPDATE ONE ENTRY
router.put("/database/:id", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(404).send("Name needed");
    }
    const { id } = req.params;
    const result = await Boys.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send("No such entry");
    }
    res.status(200).json({ message: "Entry updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Delete Entry
router.delete("/database/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exits = await Boys.findByIdAndDelete(id);
    if (!exits) {
      return res.status(404).send("No such entry");
    }
    res.status(200).json({ message: "Entry deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    // check if user exist
    const user = await UserModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if(user.password != password){
      console.log(user.password)
      console.log(password)
      return res.status(404).json({ error: "Password is not Right" });
    }

    return res.status(200).json("login");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
