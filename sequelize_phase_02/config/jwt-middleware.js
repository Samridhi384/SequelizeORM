const jwt = require("jsonwebtoken");
const jwtConfig = require("./jwt-config");

let checktoken = (req, res, next) => {
  let userToken = req.headers["authorization"];

  if (userToken) {
    //we have token

    jwt.verify(
      userToken,
      jwtConfig.secret,
      { algorithm: jwtConfig.algorithm },
      (error, data) => {
        if (error) {
          res.status(500).json({
            status: 0,
            message: "Invalid",
            data: error,
          });
        } else {
          req.user = data;
          next();
        }
      }
    );
  } else {
    //we do not have token
    res.status(500).json({
      status: 0,
      message: "Please provided authenticated token value",
    });
  }
};

module.exports = {
  checktoken: checktoken,
};
