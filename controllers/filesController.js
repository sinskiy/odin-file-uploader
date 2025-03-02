const { body, validationResult } = require("express-validator");
const { prisma } = require("../lib/prisma");

async function filesGet(req, res, next) {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });
    const files = await prisma.file.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.render("index", { files, folders });
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

const validateName = [
  body("name")
    .isLength({ min: 1, max: 30 })
    .withMessage("Name must be between 1 and 30 characters."),
];
async function checkFilenameValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { fileId } = req.params;
    try {
      const file = await prisma.file.findUniqueOrThrow({
        where: {
          id: Number(fileId),
        },
      });
      return res.render("rename", { file, errors: errors.array() });
    } catch (err) {
      next(err);
    }
  }
  next();
}
async function renamePost(req, res, next) {
  const { name } = req.body;
  const { fileId } = req.params;
  try {
    await prisma.file.update({
      data: {
        name,
      },
      where: {
        id: Number(fileId),
      },
    });
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
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  filesGet,
  fileGet,
  renameGet,
  validateName,
  checkFilenameValidation,
  renamePost,
  deleteGet,
};
