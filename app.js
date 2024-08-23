require("dotenv").config();
const path = require("node:path");

const express = require("express");
const authRouter = require("./routes/authRouter");
const filesRouter = require("./routes/filesRouter");
const foldersRouter = require("./routes/foldersRouter");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

const port = process.env.PORT ?? 3000;
app.listen(
  port,
  () =>
    process.env.NODE_ENV === "development" &&
    console.log(`http://localhost:${port}`)
);
