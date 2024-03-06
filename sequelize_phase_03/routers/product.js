const express = require("express");
const productModel = require("../models").Product;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

router.get("/products", (req, res) => {
  productModel
    .findAll({
      //   attributes: ["id", "name"],
      //   limit: 10,
      //   offset: 4, //first index value to start
      //   //   order: [["id", "DESC"]],
      //   order: [["name", "ASC"]],

      where: {
        // id: 118,
        // id: {
        //   //   [Op.eq]: 104,
        //   [Op.between]: [110, 115],
        // },
        // name: {
        //   [Op.and]: [
        //     { [Op.like]: "P%" },
        //     { [Op.like]: "%Table%" }, //name like starts with p and has table keyword
        //   ],
        // },
        // amount: {
        //   [Op.gt]: 500, //amt > 500
        // },
        // id: {
        //   [Op.and]: [{ [Op.gte]: 120 }, { [Op.lt]: 150 }],
        // },
        // id: {
        //   [Op.or]: [{ [Op.gte]: 120 }, { [Op.lt]: 150 }],
        // },

        [Op.or]: [
          {
            id: { [Op.eq]: 120 },
          },

          {
            name: { [Op.eq]: "Handmade Metal Salad" },
          },
        ],
      },
    })
    .then((data) => {
      if (data) {
        res.status(200).json({
          status: 1,
          message: "This is products page",
          data: data,
        });
      } else {
        res.status(200).json({
          status: 0,
          message: "No products found",
        });
      }
    });
});

module.exports = router;
