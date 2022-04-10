const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  address: String,
  mobile: {
    type: Number,
    required: true,
  },
});

module.exports = userSchema;
