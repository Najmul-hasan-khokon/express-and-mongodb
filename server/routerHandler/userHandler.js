const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../schema/userSchema");

// user model
const User = new mongoose.model("user", userSchema);

// get all users
router.get("/", (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "users were getted successfully!",
      });
    }
  });
});

// get all users with chaining methods
/**
 * router.get("/", (req, res) => {
  User.find({ name: "najmul" })
    .select({ age: 0 })
    .limit(1)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "there was a server side error",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "users were getted successfully!",
        });
      }
    });
});
 */

// get a  single user By Id
router.get("/:id", async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "users was getted successfully!",
    });
  } catch (err) {
    res.status(500).json({ error: "there was a server side error" });
  }
});

// post a single user
router.post("/", (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  newUser.save((err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "user was inserted successfully!",
        result: data,
      });
    }
  });
});

// post multiple users
router.post("/all", (req, res) => {
  User.insertMany(req.body, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "user were inserted successfully!",
        result: data,
      });
    }
  });
});

// delete a single user By Id
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "user was deleted successfully!",
      });
    }
  });
});

// delete all user
router.delete("/", (req, res) => {
  User.deleteMany((err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "user were deleted successfully!",
      });
    }
  });
});

// update a user By Id
router.put("/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "user was updated successfully!",
        result: data,
      });
    }
  });
});

module.exports = router;
