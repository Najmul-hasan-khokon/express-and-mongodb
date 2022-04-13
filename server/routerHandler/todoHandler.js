const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const todoShema = require("../schema/todoSchema");
const checkLogin = require("../middlewares/checkLogin");
const Todo = new mongoose.model("Todo", todoShema);

// get a single todo
router.get("/:id", checkLogin, async (req, res) => {
  const data = await Todo.find({ _id: req.params.id });
  if (data) {
    res.status(200).json({
      message: "todo was getted successfully",
      result: data,
    });
  } else {
    res.status(500).json({
      error: "there was a sever side error!",
    });
  }
});

// get multiple todos
router.get("/", (req, res) => {
  Todo.find((err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side errror",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "todo was inserted successfully!",
      });
    }
  });
});

// post a single todo
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side errror",
      });
    } else {
      res.status(200).json({
        message: "todo was inserted successfully!",
      });
    }
  });
});

// post a multiple todos
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side errror",
      });
    } else {
      res.status(200).json({
        message: "todo were inserted successfully!",
      });
    }
  });
});

// put todo
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: "hdd",
      },
    },
    (err) => {
      if (err) {
        return res.status(500).json({
          error: "there was a server side errror",
        });
      } else {
        return res.status(200).json({
          message: "todo was updated successfully!",
        });
      }
    }
  );
  // console.log(result);
});
// delete todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(500).json({
        error: "there was a server side errror",
      });
    } else {
      return res.status(200).json({
        message: "todo was deleted successfully!",
      });
    }
  });
});

module.exports = router;
