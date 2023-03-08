const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const uploads = require("../middleware/imageupload");
const Project = require("../models/Projects");
const User = require("../models/Users");

// const upload = multer({ dest: "uploads/" });
// const { body, validationResult } = require("express-validator");

// -------------------- All project end points -------------------

// ROUTE 1: Get all projects of the user : GET "/api/projects/fetchallprojects".
router.get("/fetchallprojects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error." });
  }
});

// ROUTE 2: Add a new project in the user account : POST "/api/projects/addproject". Login required.
router.post(
  "/addproject",
  fetchuser,
  uploads,
  [
    body("pname", "Enter a title of a minimum 3 characters.").isLength({
      min: 3,
    }),
    body("location", "Enter a location of a minimum 3 characters.").isLength({
      min: 3,
    }),
    body("year", "Enter a year in digits. It must contain exact four digits.")
      .isNumeric()
      .isLength({ max: 4 }),
  ],
  async (req, res) => {
    try {
      const { pname, description, location, year, category, inprogress } =
        req.body;

      // If user doesn't upload any image.
      let images = [];
      // console.log(req.files[0].path);
      if (req.files.length > 0) {
        for (i = 0; i < req.files.length; i++) {
          images.push(req.files[i].path);
        }
      }

      // console.log(images, 85);

      // If an error, it'll return a bad request and an error.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors.array() });
      }
      // Get the name of the user for variable alteredby.
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(400).json({ Error: "Please login first." });
      }
      // Variable will take values and store them in the 'project' table.
      const project = new Project({
        pname,
        description,
        location,
        year,
        category,
        inprogress,
        user: user.id,
        show: false,
        alteredby: "Not Yet",
        images: images,
      });

      // Data is sent to the db.
      const saveProject = await project.save();
      res.json({ Success: "The new project is saved.", Project: saveProject });
      console.log(pname + " project is saved.", 111);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Error: "Internal server error." });
    }
  }
);

// ROUTE 3: Edit an existing project : PUT "/api/projects/updateproject". Login required.
router.put("/updateproject/:id", fetchuser, async (req, res) => {
  try {
    const { pname, description, location, year, category, inprogress, show } =
      req.body;
    // get name of the user for the variable alteredby.
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ Error: "Please login first." });
    }

    // Get data from the user and store it in newProject object.
    const newProject = {};
    if (pname) {
      newProject.pname = pname;
    }
    if (description) {
      newProject.description = description;
    }
    if (location) {
      newProject.location = location;
    }
    if (year) {
      newProject.year = year;
    }
    if (category) {
      newProject.category = category;
    }
    if (inprogress) {
      newProject.inprogress = inprogress;
    }
    if (show) {
      newProject.show = show;
    }
    newProject.alteredby = user.name;

    // Find the project and update it. ----
    let project = await Project.findById(req.params.id);

    // If the project is not found.
    if (!project) {
      return res.status(404).send("Project not found");
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: newProject },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error." });
  }
});

// ROUTE 4: Delete an existing project : DELETE "/api/projects/deleteproject". Login required.
router.delete("/deleteproject/:id", fetchuser, async (req, res) => {
  try {
    // Find the project if it is there.
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ Unsuccessfull: "Project not found." });
    }

    // Check if the logged-in user is the authorized user and project belongs to the user who logged in.
    // if (project.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not allowed");
    // }

    // Find and delete the project.
    project = await Project.findByIdAndDelete(req.params.id);
    res.json({ Success: "The project has been deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error." });
  }
});

// ROUTE 4: Check the project by name: POST "/api/projects/fetchproject" Login required.
router.post("/fetchproject", fetchuser, async (req, res) => {
  try {
    const { pname } = req.body;
    // Find project by the name.
    const project = await Project.find({ pname });
    // If the project is not found.
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res
      .status(200)
      .json({ Success: "The project is found.", project: project });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error." });
  }
});

module.exports = router;
