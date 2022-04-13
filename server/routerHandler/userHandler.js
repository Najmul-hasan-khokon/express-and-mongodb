const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const checkLogin = require("../middlewares/checkLogin");

// user model
const User = new mongoose.model("user", userSchema);

// signup
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "signup was successfull",
    });
  } catch (err) {
    res.status(500).json({
      error: "signup was failed",
    });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });

    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      // jodi password match kore
      if (isValidPassword) {
        // Genarate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          accessToken: token,
          message: "login successfull",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Authentication failed",
    });
  }
});

module.exports = router;
