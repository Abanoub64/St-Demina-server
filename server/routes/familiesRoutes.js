const express = require("express");
const datarouter = express.Router();
const Boys = require("../modules/boys");
const cors = require("cors");
const FamilyModel = require("../modules/families");
const requireAuth = require("../middleware/requireAuth");

datarouter.use(cors());
// datarouter.use(requireAuth);

// GET ALL DATA
datarouter.get("/database", async (req, res) => {
  const families = await FamilyModel.find();
  try {
    res.status(200).json(families);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

datarouter.get("/class/:ageStages", async (req, res) => {
  const ageStages = req.params.ageStages.split(",").map(Number);

  try {
    const childrenQueries = ageStages.map((ageStage) =>
      FamilyModel.find({ "Childrenlist.age_stage": ageStage }).exec()
    );
    const childrenResults = await Promise.all(childrenQueries);

    // Process the results
    const allChildren = childrenResults.flatMap((children) => children);

    const result = allChildren.map(
      ({ father, Childrenlist, location, mother }) => {
        const child = Childrenlist.find((c) => ageStages.includes(c.age_stage));
        return {
          childName: `${child.name} ${father.firstname} ${father.secondname}`,
          phone1: child.phone || "",
          phone2: father.phone || "",
          phone3: mother.phone || "",
          birthdate: child.birthdate || "",
          address: `${location.distract || ""} ${location.area || ""} ${
            location.buildingNo || ""
          } ${location.streetNo || ""}  ${
            location.floorNo ? `الدور ${location.floorNo}` : ""
          }`,
          gps: location.gps || "",
          marks: location.marks || "",
        };
      }
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ADD NEW ENTIRY
datarouter.post("/database", async (req, res) => {
  console.log(req.body);

  try {
    const { father, mother, location, Childrenlist } = req.body;
    const newfamily = {
      father,
      mother,
      location,
      Childrenlist,
    };
    const family = await FamilyModel.create(newfamily);
    console.log(family);
    res.json({
      success: `تم اضافة اسرة الاستاذ ${family.father.firstname} ${family.father.secondname}`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// GET INFO OF ONE ENTRY
datarouter.get("/database/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exits = await FamilyModel.findById(id);
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
datarouter.put("/database/:id", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(404).send("Name needed");
    }
    const { id } = req.params;
    const result = await FamilyModel.findByIdAndUpdate(id, req.body);
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
datarouter.delete("/database/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exits = await FamilyModel.findByIdAndDelete(id);
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
datarouter.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    // check if user exist
    const user = await UserModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success: "Welcome" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = datarouter;
