const JWT = require("jsonwebtoken");
const jwtConfig = require("./jwt-config");

const validateToken = (req, res, next) => {
  let tokenValue = req.headers["authorization"];

  if (tokenValue) {
    //we have token
    JWT.verify(tokenValue, jwtConfig.secret, (error, data) => {
      if (error) {
        res.status(500).json({
          status: 1,
          message: "Invalid token",
          data: error,
        });
      } else {
        // res.status(200).json({
        //   status: 1,
        //   message: "Get profile",
        //   data: data,
        // });
        req.data = data;
        next();
      }
    });
  } else {
    //token not found
    res.status(404).json({
      status: 0,
      message: "Provide token value",
    });
  }
};

module.exports = {
  checkToken: validateToken,
};
