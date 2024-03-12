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

            const schema = {
              name: { type: "string", optional: false, max: "100" },
              email: { type: "string", optional: false, max: "50" },
              password: { type: "string", optional: false, max: "100" },
            };

            const v = new Validator();
            const validationResponse = v.validate(user, schema);
            if (validationResponse !== true) {
              return res.status(400).json({
                message: "validation failed",
                error: validationResponse,
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
              "secret",
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
