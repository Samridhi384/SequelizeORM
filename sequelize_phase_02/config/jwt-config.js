require("dotenv").config();

module.exports = {
  secret: process.env.SECRET,
  expiresIn: 120, //in m , by default expire after 2 mins of login
  notBefore: 2, //after 2 sec we are able to use token
  audience: "site-users",
  issuer: "localhost",
  algorithm: "HS384",
};
