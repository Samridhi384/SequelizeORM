const express = require("express");
const EmailModel = require("./models").Email;
const UserModel = require("./models").User;
const PostModel = require("./models").Post;
const CommentModel = require("./models").Comment;
const PersonModel = require("./models").People;
const RoleModel = require("./models").Role;
const PersonRoleModel = require("./models").PersonRoleModel;
require("dotenv").config();

const app = express();

const PORT = 8087;

//get all roles and their respective users
app.get("/roles", (req, res) => {
  RoleModel.findAll({
    include: {
      model: PersonModel,
      attributes: ["name"],
      through: {
        model: PersonRoleModel,
      },
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data,
    });
  });
});

//get all users and their respective roles
app.get("/people", (req, res) => {
  PersonModel.findAll({
    include: {
      model: RoleModel,
      attributes: ["name"],
      through: {
        model: PersonRoleModel,
      },
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data,
    });
  });
});

app.get("/comments", (req, res) => {
  CommentModel.findAll({
    include: {
      model: PostModel,
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data,
    });
  });
});

app.get("/posts", (req, res) => {
  PostModel.findAll({
    include: {
      model: CommentModel,
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data,
    });
  });
});

app.get("/emails", (req, res) => {
  EmailModel.findAll({
    include: {
      model: UserModel,
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data: data,
    });
  });
});

app.get("/users", (req, res) => {
  UserModel.findAll({
    include: {
      model: EmailModel,
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data: data,
    });
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
