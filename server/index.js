const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routerHandler/todoHandler");
const userHandler = require("./routerHandler/userHandler");

const port = 3000;

// express app initialize
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://localhost/crud-operation", {
    // --unhandled-rejections=strict: false
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
