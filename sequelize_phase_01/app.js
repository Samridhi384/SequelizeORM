const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = require("./routes");
const port = 8087;

app.use(bodyParser.json());

app.use("/", router);

//listed routes
app.listen(port, () => {
  console.log("Application is running");
});
