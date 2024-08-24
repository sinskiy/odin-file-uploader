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

async function folderGet(req, res, next) {
  try {
    const { folderId } = req.params;
    const folder = await prisma.folder.findUnique({
      where: { id: Number(folderId) },
      include: { files: true },
    });
    res.render("index", {
      folder,
      files: folder.files,
      showFolders: false,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createGet, createPost, folderGet };
