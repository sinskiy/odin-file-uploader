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

// TODO: move to upload controller
function uploadGet(req, res) {
  res.render("upload");
}

async function uploadPost(req, res, next) {
  const { folderId } = req.params;
  const { originalname, filename } = req.file;
  console.log(req.params, folderId ? Number(folderId) : null);
  try {
    await prisma.file.create({
      data: {
        originalName: originalname,
        fileName: filename,
        folderId: folderId ? Number(folderId) : null,
      },
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function fileGet(req, res, next) {
  const { fileId } = req.params;
  try {
    const file = await prisma.file.findUniqueOrThrow({
      where: {
        id: Number(fileId),
      },
    });
    res.render("file", { file });
  } catch (err) {
    next(err);
  }
}

module.exports = { filesGet, uploadGet, uploadPost, fileGet };
