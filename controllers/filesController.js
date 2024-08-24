const { prisma } = require("../auth/prisma");

async function filesGet(req, res, next) {
  try {
    const folders = await prisma.folder.findMany();
    res.render("index", { folders });
  } catch (err) {
    next(err);
  }
}

function uploadGet(req, res) {
  res.render("upload");
}

function uploadPost(req, res) {
  res.redirect("/");
}

module.exports = { filesGet, uploadGet, uploadPost };
