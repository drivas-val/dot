const models = require("../models");
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

const sighnUp = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already in use!",
        });
      } else {
        bcryptjs.genSalt(10, (error, salt) => {
          bcryptjs.hash(req.body.password, salt, (error, hash) => {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };

            if (user.password.length > 64 || user.password.length < 1) {
              return res.status(400).json({
                message: "Password parsing error!",
              });
            }
            if (user.email.length > 64 || user.email.length < 1) {
              return res.status(400).json({
                message: "Email parsing error!",
              });
            }
            if (user.name.length > 64 || user.name.length < 1) {
              return res.status(400).json({
                message: "Name parsing error!",
              });
            }

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
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "There was an error creating the User",
      });
    });
};

const login = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      } else {
        bcryptjs.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.userId,
              },
              process.env.JWT_KEY,
              (err, token) => {
                res.status(200).json({
                  message: "Authentication Successful!",
                  token: token,
                });
              }
            );
          } else {
            res.status(401).json({
              message: "Authentication Error! Your password may be inccorect!",
            });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

module.exports = {
  signUp: sighnUp,
  login: login,
};
