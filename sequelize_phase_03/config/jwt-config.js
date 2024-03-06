require("dotenv").config();

module.exports = {
  secret: process.env.SECRET,
  expiresIn: 10000, //in seconds
  notBefore: 30,
};
