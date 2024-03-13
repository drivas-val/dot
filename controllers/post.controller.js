const Validator = require("fastest-validator");
const models = require("../models");

//save a post (create one)
const save = (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: 1,
  };
  //define proper values
  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "2200" },
    categoryId: { type: "number", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(post, schema);
  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationResponse,
    });
  }

  models.Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: "Post Created Successfully!",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    });
};

//show a specific post based on Id
const show = (req, res) => {
  const id = req.params.id;
  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "post not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

//show all posts in the system
const index = (req, res) => {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

//update a post based on id
const update = (req, res) => {
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
  };

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "2200" },
    categoryId: { type: "number", optional: false },
  };
  //Esnure posts updates fit requirements
  const v = new Validator();
  const validationResponse = v.validate(updatedPost, schema);
  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationResponse,
    });
  }

  const userId = 1;
  models.Post.update(updatedPost, { where: { id: id, userId: userId } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "post updated successfully!",
          post: updatedPost,
        });
      } else {
        res.status(500).json({
          message: "Post could not be found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Updating post was unsuccessful!",
        error: error,
      });
    });
};

//remove a post based on id
const destroy = (req, res) => {
  const id = req.params.id;
  const userId = 1;

  models.Post.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "post eliminated successfully!",
        });
      } else {
        res.status(500).json({
          message: "post could not be found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "deleting post was unsuccessful!",
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
