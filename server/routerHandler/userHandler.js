const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// hash password
const bcrypt = require("bcrypt");
// to make toke
const jwt = require("jsonwebtoken");

const userSchema = require("../schema/userSchema");
const todoSchema = require("../schema/todoSchema");
const User = new mongoose.model("user", userSchema);

// signup a user
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({
      message: "user was signUp successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "there was a server side error",
      data,
    });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });

    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      // genarate token
      if (isValidPassword) {
        const token = jwt.sign(
          { username: user[0].username, userId: user[0]._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          accessToken: token,
          message: "user was login successfully!",
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

// get all user with todos
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().populate("todos", "title description -_id");

    res.status(200).json({
      data: users,
      message: "user were getted successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "there was a server side error",
    });
  }
});

module.exports = router;
