const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routerHandler/todoHandler");
const userHandler = require("./routerHandler/userHandler");
// to access .env file
const dotenv = require("dotenv");

const port = 3000;

// express app initialize
const app = express();
dotenv.config(); // to access .env file
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://localhost/prectice", {
    // mongodb options
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("error", err));

// use external modules

app.use("/todo", todoHandler);
app.use("/user", userHandler);

// default error handler
app.use((req, res, next) => {
  res.status(404).send("not found");
});

// server error
app.use((err, req, res, next) => {
  if (res.headerSent) {
    res.send("there was a server error");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("there was error");
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`);
});
