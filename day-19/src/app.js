const express = require("express");

const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.route")

const postRouter = require("./routes/post.route")

const followRouter = require("./routes/follow.route");

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/posts', postRouter);

app.use('/api/user', followRouter);

module.exports = app;