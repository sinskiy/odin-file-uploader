require("dotenv").config();
const path = require("node:path");
const authRouter = require("./routes/authRouter");
const filesRouter = require("./routes/filesRouter");
const foldersRouter = require("./routes/foldersRouter");

// set up express
const express = require("express");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// setup middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// set up auth
const { DAY } = require("./helpers");
const session = require("express-session");
const { prismaStore } = require("./auth/prisma");
const passport = require("passport");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: DAY * 2,
    },
    store: prismaStore,
  }),
);
require("./auth/passport");
app.use(passport.session());

app.use(async (req, res, next) => {
  if (req.user) {
    // console.log(req.user);
    res.locals.user = req.user;
  }
  next();
});

app.use("/()?(files)?", filesRouter);
app.use("/folders", foldersRouter);
app.use("/", authRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

const port = process.env.PORT ?? 3000;
app.listen(
  port,
  () =>
    process.env.NODE_ENV === "development" &&
    console.log(`http://localhost:${port}`),
);
