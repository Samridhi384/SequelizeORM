const express = require("express");
const router = express.Router();
const studentModel = require("../models").Student;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const jwtConfig = require("../config/jwt-config");
const jwtMiddleware = require("../config/jwt-middleware");

//profile api for student
router.post("/profile", jwtMiddleware.checkToken, (req, res) => {
  let student_id = req.data.id;

  studentModel.findByPk(student_id).then((student) => {
    if (student) {
      res.status(200).json({
        status: 1,
        message: `Welocme ${student.name}`,
        data: student,
      });
    }
  });
});

//login api for student
router.post("/login", (req, res) => {
  studentModel
    .findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    })
    .then((student) => {
      if (student) {
        //check password
        let password = req.body.password;

        if (bcrypt.compareSync(password, student.password)) {
          //generate token method
          let token = JWT.sign(
            {
              id: student.id,
            },
            jwtConfig.secret,
            {
              expiresIn: jwtConfig.expiresIn,
              notBefore: jwtConfig.notBefore,
            }
          );

          res.status(200).json({
            status: 1,
            message: "Login successfully",
            token: token,
          });
        } else {
          res.status(500).json({
            status: 0,
            message: "Invalid credentials",
          });
        }
      } else {
        //student does not exists with same email
        res.status(500).json({
          status: 1,
          message: "User Does Not Exists!",
        });
      }
    });
});

//create student api
router.post("/students", (req, res) => {
  studentModel
    .findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    })
    .then((user) => {
      if (user) {
        //user already exixts
        res.status(500).json({
          status: 0,
          message: "User already exists",
        });
      } else {
        //create new user

        studentModel
          .create({
            name: req.body.name,
            email: req.body.email,
            roll_no: req.body.roll_no,
            password: bcrypt.hashSync(req.body.password, 10),
          })
          .then((user) => {
            res.status(200).json({
              status: 1,
              message: "student created successfully",
              data: user,
            });
          })
          .catch((err) =>
            // res.status(500).json({
            //   status: 0,
            //   data: err,
            // })
            console.log(err)
          );
      }
    });
});

module.exports = router;
