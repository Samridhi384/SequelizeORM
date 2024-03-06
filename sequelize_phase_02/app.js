const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwtConfig = require("./config/jwt-config");
const JwtMiddleware = require("./config/jwt-middleware");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const port = 8081;

//database connection string
const sequelize = new Sequelize("node_orm", "root", process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((error) => console.log(error));

//define model
const User = sequelize.define(
  "tbl_users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    modelName: "User",
  }
);

//syncing to db
User.sync();

//users profile
app.post("/profile", JwtMiddleware.checktoken, (req, res) => {
  res.status(200).json({
    status: 1,
    userData: req.user,
    message: "Token value parsed",
  });
});

//validate token api
app.post("/validate", (req, res) => {
  //   console.log(req.headers);
  let userToken = req.headers["authorization"];

  if (userToken) {
    //we have token

    jwt.verify(userToken, jwtConfig.secret, (error, decoded) => {
      if (error) {
        res.status(500).json({
          status: 0,
          message: "Invalid",
          data: error,
        });
      } else {
        res.status(200).json({
          status: 1,
          message: "Token is valid",
          data: decoded,
        });
      }
    });
  } else {
    //we do not have token
    res.status(500).json({
      status: 0,
      message: "Please provided authenticated token value",
    });
  }
});

//login api
app.post("/login", (req, res) => {
  let email = req.body.email;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      //we have user data
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          //password matched

          let userToken = jwt.sign(
            {
              email: user.email,
              id: user.id,
            },
            jwtConfig.secret,
            {
              expiresIn: jwtConfig.expiresIn, //in ms , expire after 10 mins of login
              notBefore: jwtConfig.notBefore, //after 1 min we are able to use token
              audience: jwtConfig.audience, //who is intended for the token
              issuer: jwtConfig.issuer, //the one who issued this token
              algorithm: jwtConfig.algorithm, //which algorithm should be used to sign the token
            }
          );

          res.status(200).json({
            status: 1,
            message: `Welcome ${user.name}!`,
            token: userToken,
          });
        } else {
          //password didn't match
          res.status(400).json({
            status: 0,
            message: "Invalid credentials",
          });
        }
      } else {
        //email didn't match
        res.status(400).json({
          status: 0,
          message: "Invalid email or pass",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

//register with api
app.post("/users", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 10); //hash value
  let status = req.body.status;

  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user) {
      res.status(200).json({
        status: 1,
        message: "user already exists",
      });
    } else {
      User.create({
        name,
        email,
        password,
        status,
      })
        .then(() => {
          res.status(200).json({
            status: 1,
            message: "User created",
          });
        })
        .catch((error) => {
          res.status(500).json({
            status: 0,
            message: "Error",
          });
          console.log(error);
        });
    }
  });
});

//welcome page
app.get("/", (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Welcome",
  });
});

app.listen(port, () => {
  console.log("server is running on ", port);
});
