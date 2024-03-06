const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
require("dotenv").config();

//connection with mysql database
const sequelize = new Sequelize("node_orm", "root", process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

//check db connection
sequelize
  .authenticate()
  .then((success) => {
    console.log("Database connected succefully");
  })
  .catch((error) => {
    console.log(error);
  });

//create model => first way
var User = sequelize.define(
  "tbl_users",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: 1,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    modelName: "User",
    timestamps: false,
  }
);

//sync model
sequelize.sync();
router.post("/user", (req, res) => {
  //   User.create({
  //     name: "sam",
  //     email: "sam@gmail.com",
  //     status: 1,
  //   }).then((response) => {
  //     res.status(200).json({
  //       status: 1,
  //       message: "User created successfully",
  //     });
  //       });
  User.create(req.body)
    .then((response) => {
      res.status(200).json({
        status: 1,
        message: "User created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//bulk create method
router.post("/bulk", (req, res) => {
  User.bulkCreate([
    {
      name: "ninja",
      email: "ninja@gmail.com",
      status: "1",
    },
    {
      name: "amara",
      email: "amara@gmail.com",
      status: "0",
    },
    {
      name: "nobita",
      email: "n@gmail.com",
      status: "1",
    },
    {
      name: "gabriel",
      email: "gab@gmail.com",
      status: "0",
    },
  ])
    .then(() => {
      res.send("Users created successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

//get all users
router.get("/users", (req, res) => {
  User.findAll({
    where: {
      status: "1",
    },
  }).then((response) => {
    res.status(200).json({
      status: 1,
      message: "Found all users",
      data: response,
    });
  });
});

//update api of user
router.put("/users", (req, res) => {
  User.update(
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then(() => {
      res.status(200).json({
        status: 1,
        message: "Updated successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 0,
        message: "Error while updating",
      });
    });
});

//delete api for users
router.delete("/users/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({
        status: 1,
        message: "Deleted Successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 0,
        message: "Error in deleting user",
      });
    });
});

//raw queries to select data
router.get("/query", (req, res) => {
  sequelize
    .query("SELECT * from tbl_users", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      res
        .status(200)
        .json({ status: 1, message: "query result found", data: response });
    })
    .catch((error) => {
      console.log(error);
    });
});

//raw queries to update data
router.put("/query", (req, res) => {
  sequelize
    .query(
      `UPDATE tbl_users SET name = "${req.body.name}" , email = '${req.body.email}' WHERE id = ${req.body.id}`,
      {
        type: sequelize.QueryTypes.UPDATE,
      }
    )
    .then((response) => {
      res.status(200).json({ status: 1, message: "Updated" });
    })
    .catch((error) => {
      console.log(error);
    });
});

//raw queries to delete data
router.delete("/query/:id", (req, res) => {
  sequelize
    .query(`DELETE FROM tbl_users WHERE id = ${req.params.id}`, {
      type: sequelize.QueryTypes.DELETE,
    })
    .then((response) => {
      res.status(200).json({ status: 1, message: "Deleted" });
    })
    .catch((error) => {
      console.log(error);
    });
});
//welcome page router
router.get("/", (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Welcome to homepage",
  });
});

module.exports = router;
