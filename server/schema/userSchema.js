const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [{ type: mongoose.Types.ObjectId, ref: "Todo" }],
});

module.exports = userSchema;
