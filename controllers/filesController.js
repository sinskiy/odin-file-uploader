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
  //  TODO: render  with errors
  if (!req.file) {
    return res.render("upload");
  }
  const { folderId } = req.params;
  const { originalname, filename } = req.file;
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

async function filePost(req, res, next) {
  const { fileId } = req.params;
  try {
    const file = await prisma.file.findUniqueOrThrow({
      where: {
        id: Number(fileId),
      },
    });
    // sus that we have to use public/, but it works
    const path = `public/uploads/${file.fileName}`;
    res.download(path, file.originalName);
  } catch (err) {
    next(err);
  }
}

async function renameGet(req, res, next) {
  const { fileId } = req.params;
  try {
    const file = await prisma.file.findUniqueOrThrow({
      where: {
        id: Number(fileId),
      },
    });
    res.render("rename", { file });
  } catch (err) {
    next(err);
  }
}

// TODO: validate
async function renamePost(req, res, next) {
  const { name } = req.body;
  const { fileId } = req.params;
  try {
    await prisma.file.update({
      data: {
        originalName: name,
      },
      where: {
        id: Number(fileId),
      },
    });
    console.log(
      await prisma.file.findUniqueOrThrow({
        where: {
          id: Number(fileId),
        },
      }),
    );
    res.redirect(`/files/${fileId}`);
  } catch (err) {
    next(err);
  }
}

async function deleteGet(req, res, next) {
  const { fileId } = req.params;
  try {
    await prisma.file.delete({
      where: {
        id: Number(fileId),
      },
    });
    // TODO: redirect to folder if previous route was folder
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  filesGet,
  uploadGet,
  uploadPost,
  fileGet,
  filePost,
  renameGet,
  renamePost,
  deleteGet,
};
