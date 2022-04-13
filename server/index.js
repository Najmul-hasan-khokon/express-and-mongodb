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
  .connect("mongodb://localhost/crud-operations", {
    // mongodb options
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("error", err));

// application routes
app.use("/todo", todoHandler);
app.use("/user", userHandler);

// home routes
app.get("/", (req, res, next) => {
  res.send("hello");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hello ! gfgfgfgf dfdfdf");
});

// default error handler
app.use((req, res, next) => {
  res.status(404).send("not found anything");
});

// default error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
});

app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`);
});
