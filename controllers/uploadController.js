const { prisma } = require("../lib/prisma");

function uploadGet(req, res) {
  res.render("upload");
}

async function uploadPost(req, res, next) {
  if (!req.file) {
    return res.render("upload", {
      errors: [{ msg: "File was not uploaded." }],
    });
  }
  const { folderId } = req.params;
  const { originalname, filename, size } = req.file;
  try {
    await prisma.file.create({
      data: {
        originalName: originalname,
        fileName: filename,
        size,
        folderId: folderId ? Number(folderId) : null,
        userId: req.user.id,
      },
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  uploadGet,
  uploadPost,
};
