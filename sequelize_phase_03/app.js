const express = require("express");
//include routes
const productRoutes = require("./routers/product");
const studentRoutes = require("./routers/students");
const bodyParser = require("body-parser");

const app = express();
const port = 8087;

app.use(bodyParser.json());
app.use("/", productRoutes);
app.use("/", studentRoutes);

//welcome page route
app.get("/", (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Welcome here",
  });
});

app.listen(port, () => {
  console.log("server is listening on port ", port);
});
