const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Project = require("../models/Projects");
const User = require("../models/Users");
// const { body, validationResult } = require("express-validator");

// -------------------- All project end points -------------------

// ROUTE 1: Get all projects of the user : GET "/api/projects/fetchallprojects". Login required.
router.get("/fetchallprojects", fetchuser, async (req, res) => {
  try {
    // Check if user exists.
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ Error: "Please login first." });
    }
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error." });
  }
});

// ROUTE 2: Add a new project in the user account : POST "/api/auth/addnote". Login required.
router.post(
  "/addproject",
  fetchuser,
  [
    body("pname", "Enter a title of a minimum 5 characters.").isLength({
      min: 3,
    }),
    body("location", "Enter a location of a minimum 5 characters.").isLength({
      min: 5,
    }),
    body("year", "Enter a year in digits. It must contain exact four digits.")
      .isNumeric()
      .isLength({ min: 4, max: 4 }),
  ],
  async (req, res) => {
    try {
      const { pname, description, location, year, category, inprogress } =
        req.body;
      // If an error, it'll return a bad request and an error.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Variable will take and store data in 'project'.
      const project = new Project({
        pname,
        description,
        location,
        year,
        category,
        inprogress,
        user: req.user.id,
        alterby: req.user.id,
      });
      // Data is sent to the db.
      const saveProject = await project.save();
      res.json({ Success: "The new project is saved.", Project: saveProject });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Error: "Internal server error." });
    }
  }
);

// ROUTE 3: Edit an existing project : PUT "/api/auth/updateproject". Login required.
router.put("/updateproject/:id", fetchuser, async (req, res) => {
  try {
    // If the user is not authenticated.
    // if (note.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not allowed");
    // }

    const { pname, description, location, year, category, inprogress } =
      req.body;
    // Create a newProject object.
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
    newProject.alterby = req.user.id;

    // Find the project and update it.
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

// ROUTE 4: Delete an existing note : DELETE "/api/auth/deletenote". Login required.
// router.delete("/deletenote/:id", fetchuser, async (req, res) => {
//   try {
//     // Find the note if it is there.
//     let note = await Note.findById(req.params.id);
//     if (!note) {
//       return res.status(404).send({ Unsuccessfull: "Note not found." });
//     }

//     // Check if the logged-in user is the authorized user and note belongs to the user who logged in.
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send("Not allowed");
//     }

//     // Find and delete the note.
//     note = await Note.findByIdAndDelete(req.params.id);
//     res.json({ Success: "The note has been deleted.", note: note });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ Error: "Internal server error." });
//   }
// });

module.exports = router;
