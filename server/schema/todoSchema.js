const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = todoSchema;
