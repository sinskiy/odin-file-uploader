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
  const { folderId } = req.params;
  try {
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
// TODO: after uploading a file to folder redirect to folder

async function renameGet(req, res, next) {
  const { folderId } = req.params;
  try {
    const folder = await prisma.folder.findUniqueOrThrow({
      where: { id: Number(folderId) },
    });
    res.render("rename-folder", { folder });
  } catch (err) {
    next(err);
  }
}

async function renamePost(req, res, next) {
  const { name } = req.body;
  const { folderId } = req.params;
  try {
    await prisma.folder.update({
      data: {
        name,
      },
      where: {
        id: Number(folderId),
      },
    });
    res.redirect(`/folders/${folderId}`);
  } catch (err) {
    next(err);
  }
}

async function deleteGet(req, res, next) {
  const { folderId } = req.params;
  try {
    await prisma.folder.delete({
      where: {
        id: Number(folderId),
      },
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGet,
  createPost,
  folderGet,
  renameGet,
  renamePost,
  deleteGet,
};
