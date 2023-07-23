const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const JWTSec = process.env.REACT_APP_JWT_SECRET;
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required.
router.post(
  "/createuser",
  [
    body("name", "Name must consist of at least 3 characters.").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email.").isEmail(),
    body(
      "password",
      "Password must consist of at least 5 characters."
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Variable for console.
    let success = false;
    // If the req.body values are not valid then it will return bad errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check if email already exists.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ Error: "User already exists. Please use another email." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Data will be stored in the database.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        role: req.body.role,
      });

      // Get user id.
      const data = {
        user: {
          id: user.id,
        },
      };

      // Sign user id with a JWT secret.
      const authtoken = jwt.sign(data, JWTSec);
      success = true;
      // Return a user id.
      res.json({ authtoken });
      //   user = await User.create(req.body).then((usr) => res.json(usr));
    } catch (error) {
      // Display errors.
      success = false;
      console.error(error.message);
      res.status(500).json({ success, Error: "Internal server error." });
    }
  }
);

// ROUTE 2: Authenticate the user using : POST "/api/auth/login". No login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    // body("password", "Password cannot be empty.").exists(),
    body("password", "Password cannot be empty.").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    // If an error, it'll return a bad request and an error.
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Check email
      let user = await User.findOne({ email });
      //Throw an error if email not found.
      if (!user) {
        return res.status(400).json({
          success,
          error:
            "The current credentials are wrong. Please enter the valid credentials.",
        });
      }
      //Compare Password
      const passwordCompare = await bcrypt.compare(password, user.password);
      //Throw an error if password not found.
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error:
            "The current credentials are wrong. Please enter the valid credentials.",
        });
      }
      // Return a token if email and password is valid.
      const data = {
        user: user.id,
      };
      const authtoken = jwt.sign(data, JWTSec);
      success = true;
      res.json({ success, authtoken });
      console.log(success, authtoken);
    } catch (error) {
      success = false;
      console.error(error.message);
      res.status(500).json({ Error: "Internal server error." });
    }
  }
);

// ROUTE 3: Get the user details using : POST "/api/auth/getuser". Login required.
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let success = false;
    const userId = req.user.id;
    // Find the user by id and -password is added to get user details except password.
    const user = await User.findById(userId).select("-password").select("-_id");
    success = true;
    res.json({ success, user });
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).json({ success, Error: "Internal server error." });
  }
});

// ROUTE 4: Edit the user details using : POST "/api/auth/edituser". Login Required.
router.post("/edituser", fetchuser, async (req, res) => {
  try {
    let success = false;
    // Get detials from the frontend
    const updateUser = req.body;

    // Get user id from the token.
    const userId = req.user.id;
    // Check if user is in the database.
    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ Error: "Please login first." });
    }

    // Update user details
    user = await User.findByIdAndUpdate(
      userId,
      { $set: updateUser },
      { new: true }
    ).select("-password");
    success = true;
    res.send({ success, user });
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).json({ success, Error: "Internal server error." });
  }
});

module.exports = router;
