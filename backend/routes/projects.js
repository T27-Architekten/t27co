const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { uploads, deleteImages } = require("../middleware/images");
// const deleteimage = require("../middleware/images");
const Project = require("../models/Projects");
const User = require("../models/Users");

// const upload = multer({ dest: "uploads/" });
// const { body, validationResult } = require("express-validator");

// -------------------- All project end points -------------------

// ROUTE 1: Get all projects of the user : GET "/api/projects/fetchallprojects".
router.get("/fetchallprojects", async (req, res) => {
  try {
    const projects = await Project.find();
    // console.log(projects);
    res.send(projects);
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
      // console.log(req.body);

      // If user doesn't upload any image.
      let images = [];
      // console.log(req.files[0].path);
      if (req.files.length > 0) {
        for (i = 0; i < req.files.length; i++) {
          // images.push(req.files[i].path);
          images.push(req.files[i].filename);
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
      // const user = await User.findById(userId).select("-password");
      // if (!user) {
      //   return res.status(400).json({ Error: "Please login first." });
      // }
      // Variable will take values and store them in the 'project' table.
      const project = new Project({
        pname,
        description,
        location,
        year,
        category,
        inprogress,
        user: userId,
        show: false,
        alteredby: "Not Yet",
        images: images,
      });

      // Data is sent to the db.
      const saveProject = await project.save();
      res
        .status(200)
        .json({ Success: "The new project is saved.", Project: saveProject });
      console.log(pname + " project is saved.", 111);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Error: "Internal server error." });
    }
  }
);

// ROUTE 3: Edit an existing project : PUT "/api/projects/updateproject". Login required.
router.put("/updateproject", fetchuser, async (req, res) => {
  try {
    let success = false;
    const {
      _id,
      pname,
      description,
      location,
      year,
      category,
      inprogress,
      show,
    } = req.body;
    console.log(req.body, 113);
    // console.log(112, pname);
    // let images = [];
    // console.log(req.files[0].path);
    // if (req.files.length > 0) {
    //   for (i = 0; i < req.files.length; i++) {
    //     // images.push(req.files[i].path);
    //     images.push(req.files[i].filename);
    //   }
    // }

    // get name of the user for the variable alteredby.
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ success, Error: "Please login first." });
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

    console.log(newProject);
    // Find the project and update it. ----
    let project = await Project.findById(_id);

    // If the project is not found.
    if (!project) {
      return res.status(404).json({ success, Error: "Project not found" });
    }

    project = await Project.findByIdAndUpdate(
      _id,
      { $set: newProject },
      { new: true }
    );
    if (project) {
      success = true;
      res.status(200).json({ project, success });
    } else {
      success = false;
      res.status(400).json({ success });
    }
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error.", success });
  }
});

// ROUTE 4: Delete an existing project : DELETE "/api/projects/deleteproject". Login required.
router.delete("/deleteproject", fetchuser, deleteImages, async (req, res) => {
  try {
    let success = false;
    const id = req.body.id;
    console.log(id);
    // Find the project if it is there.
    let project = await Project.findById({ _id: id });
    if (!project) {
      return res.status(404).send({ Unsuccessfull: "Project not found." });
    }
    // Find and delete the project.
    project = await Project.findByIdAndDelete({ _id: id });
    if (project) {
      success = true;
      console.log("Tha Project has been deleted.");
      res.json({ success, Success: "The project has been deleted." });
    }
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).json({ success, Error: "Internal server error." });
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

// ROUTE 5: Delete image: POST "/api/projects/deleteimage". Login required.
router.put("/deleteimage", fetchuser, deleteImages, async (req, res) => {
  try {
    let success = false;

    // Get id and image from the body.
    const { id, images } = req.body;
    console.log(id + images, 226);
    // Check the availability of the project.
    let projectId = await Project.findById({ _id: id });
    if (!projectId) {
      return res.status(404).send({ Unsuccessfull: "Project not found." });
    }

    // Find and delete the image from the images array in the project.
    const deleteImage = await Project.findByIdAndUpdate(
      { _id: id },
      { $pull: { images: images } }
    );

    // Respond if succussfully updated.
    if (deleteImage) {
      success = true;
      res.json({ success, Deleted: "The project has been deleted." });
    }
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).json({ success, Error: "Internal server error." });
  }
});

// ROUTE 6: Add images to the existing project: POST "/api/projects/addimages". Login required.
router.put("/addimages", fetchuser, uploads, async (req, res) => {
  try {
    let success = false;
    // Get id and image from the body.
    const { id, pname } = req.body;
    console.log(id + pname, 265);

    let images = [];

    if (req.files.length > 0) {
      for (i = 0; i < req.files.length; i++) {
        // images.push(req.files[i].path);
        images.push(req.files[i].filename);
      }
    }

    console.log(images, 276);

    // Check the availability of the project.
    let projectId = await Project.findById({ _id: id });
    if (!projectId) {
      return res.status(404).send({ Unsuccessfull: "Project not found." });
    }

    // Push multiple values in the images array.
    const project = await Project.findByIdAndUpdate(
      { _id: id },
      { $push: { images: { $each: images, $position: 0 } } }
    );

    // Respond if succussfully updated.
    if (project) {
      success = true;
      console.log(project);
      res.json({
        success,
        Added: "The project's images are updated.",
        images,
      });
    }
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).json({ success, Error: "Internal server error." });
  }
});

module.exports = router;
