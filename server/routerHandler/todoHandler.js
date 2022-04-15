const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// to protect route
const checkLogin = require("../middlewares/checkLogin");

const todoSchema = require("../schema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// to update user
const userSchema = require("../schema/userSchema");
const User = new mongoose.model("User", userSchema);

// get multiple todos
router.get("/", checkLogin, async (req, res) => {
  Todo.find()
    .populate("user", "name username -_id")
    .limit(1)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          message: "there was a server side error",
        });
      } else {
        res.status(200).json({
          message: "todo were getted successfully!",
          data,
        });
      }
    });
});

// post a todo
// ekhane ami todo create korar somoy user er Id todo te save korci
// r todo er id user e save korci . jate both way relation thake.
router.post("/", checkLogin, async (req, res) => {
  try {
    const newTodo = new Todo({
      ...req.body,
      user: req.userId,
    });
    const todo = await newTodo.save();

    // insert todo Id into user
    await User.updateOne(
      {
        id: req.userId,
      },
      {
        $push: { todos: todo._id },
      }
    );

    res.status(200).json({
      message: "todo was inserted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "there was a server side error",
    });
  }
});

module.exports = router;
