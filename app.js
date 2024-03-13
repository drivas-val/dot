const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const userRoute = require("./routes/user");
const imageRouter = require("./routes/images");

app.use(bodyParser.json());

//Make all uploads acessible
app.use("/uploads", express.static("uploads"));

app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/user", userRoute);
app.use("/images", imageRouter);

module.exports = app;
