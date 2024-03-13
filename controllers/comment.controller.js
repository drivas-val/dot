const Validator = require("fastest-validator");
const models = require("../models");

//Save comment
const save = (req, res) => {
  const comment = {
    content: req.body.content,
    postId: req.body.postId,
    userId: 1,
  };

  const schema = {
    content: { type: "string", optional: false, max: "500" },
    postId: { type: "number", optional: false },
  };

  //Validate comment fits requirements
  const v = new Validator();
  const validationResponse = v.validate(comment, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }
  //Use primary key to obtain single entry
  models.Post.findByPk(req.body.postId)
    .then((post) => {
      if (post === null) {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        models.Comment.create(comment)
          .then((result) => {
            res.status(201).json({
              message: "Comment created successfully",
              comment: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Something went wrong",
              error: error,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
};

// show specific comment
const show = (req, res) => {
  const id = req.params.id;
  //find comment by primary key
  models.Comment.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Comment not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

//show all comments
const index = (req, res) => {
  //list of all comments
  models.Comment.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

//update working comment
const update = (req, res) => {
  const id = req.params.id;
  const updatedComment = {
    content: req.body.content,
  };

  const userId = 1;

  const schema = {
    content: { type: "string", optional: false, max: "500" },
  };
  // Ensure update fits requirements
  const v = new Validator();
  const validationResponse = v.validate(updatedComment, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }
  // Fit the comment with its corresponding ID and USERID
  models.Comment.update(updatedComment, { where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Comment updated successfully",
        post: updatedComment,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Something went wrong",
        error: error,
      });
    });
};

//Delete a comment
const destroy = (req, res) => {
  const id = req.params.id;
  const userId = 1;

  models.Comment.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Comment deleted successfully",
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Something went wrong",
        error: error,
      });
    });
};

module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  destroy: destroy,
};
