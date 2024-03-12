const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const userRoute = require("./routes/user");

app.use(bodyParser.json());

app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/user", userRoute);

module.exports = app;
