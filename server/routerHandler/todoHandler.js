const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const todoShema = require("../schema/todoSchema");
const Todo = new mongoose.model("Todo", todoShema);

// get a single todo
router.get("/:id", async (req, res) => {
  const result = await Todo.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a sever side error!",
      });
    } else {
      res.status(200).json({
        message: "todo was getted successfully",
        result: data,
      });
    }
  });
  console.log(res.body);
});

// get multiple todos
router.get("/", async (req, res) => {
  await Todo.find((err, data) => {
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
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
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
