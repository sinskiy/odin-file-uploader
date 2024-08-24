const { prisma } = require("../auth/prisma");

function createGet(req, res) {
  res.render("create");
}

async function createPost(req, res, next) {
  try {
    const { name } = req.body;
    await prisma.folder.create({ data: { name } });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = { createGet, createPost };
