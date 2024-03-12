const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sighnUp = (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  models.User.create(user)
    .then((result) => {
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "There was an error creating the User",
      });
    });
};

module.exports = {
  signUp: sighnUp,
};
