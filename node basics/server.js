const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send({
    status: 1,
    message: "simple get method",
  });
});

app.post("/", function (req, res) {
  res.send({
    status: 1,
    message: "simple get method",
  });
});

app.put("/", function (req, res) {
  res.send({
    status: 1,
    message: "simple get method",
  });
});

app.delete("/", function (req, res) {
  res.send({
    status: 1,
    message: "simple get method",
  });
});

app.listen(8087, () => {
  console.log("app is running");
});
