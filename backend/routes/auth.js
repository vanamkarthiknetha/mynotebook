const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const tokenKey ="kaka#1"

//Route1: Endpoint for creating user
router.post(
  "/createuser",
  [
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    // Checking if given input by user is not valid for creating a account
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
      return;
    }
    try {
      let success=false;
      // Checking any user exists with this email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Already a user exists with this email" });
      }
      // if no existing user creating account
      // hashing password
      const salt = bcrypt.genSaltSync(10);
      const securedPassword = bcrypt.hashSync(req.body.password, salt);

      user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });
      user.save();

      // Creating Authentication token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, tokenKey);
      success=true;
      res.json({success,authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some internal error ocuured");
    }
  }
);

//Route2: Endpoint for user login
router.post(
  "/login",
  [
    body("password", "Password cannot be empty").exists(),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    // Checking if given input by user is not valid for login
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
      return;
    }
    try {
      let success=false;
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ success,error: "Enter correct credentials to login" });
      }
      const { password } = req.body;
      const passwordCompare =await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success,error: "Enter correct credentials to login" });
      }
      // Creating Authentication token if user exists
      success=true;
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, tokenKey);
      res.json({success,authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some internal error ocuured");
    }
  }
);

//Route3: Endpoint to get user(Login required)
router.post("/getuser",fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal error ocuured");
  }
});

module.exports = router;
