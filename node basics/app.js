const express = require("express");

const app = express();

const PORT = 8087;

//about us page
app.get("/about", (req, res) => {
  res.send({
    status: 1,
    message: "About us page",
  });
});

//welcome page
app.get("/", function (req, res) {
  res.send({
    status: 1,
    message: "simple get method",
  });
});

app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
