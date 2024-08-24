const { prisma } = require("../auth/prisma");

async function filesGet(req, res, next) {
  try {
    const folders = await prisma.folder.findMany();
    const files = await prisma.file.findMany();
    res.render("index", { files, folders });
  } catch (err) {
    next(err);
  }
}

function uploadGet(req, res) {
  res.render("upload");
}

async function uploadPost(req, res, next) {
  console.log(req.file);
  const { originalname, filename } = req.file;
  try {
    await prisma.file.create({
      data: {
        originalName: originalname,
        fileName: filename,
      },
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = { filesGet, uploadGet, uploadPost };
