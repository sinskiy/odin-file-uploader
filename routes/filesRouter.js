const { Router } = require("express");
const {
  filesGet,
  fileGet,
  renameGet,
  deleteGet,
  renamePost,
  validateName,
  checkFilenameValidation,
} = require("../controllers/filesController");
const { isUser } = require("../controllers/authController");
const { uploadGet, uploadPost } = require("../controllers/uploadController");
const upload = require("../lib/multer");
const router = Router();

router.get("/", isUser, filesGet);
router.get("/upload", isUser, uploadGet);
router.post("/upload", upload.single("file"), uploadPost);
router.get("/:fileId", fileGet);
router.get("/:fileId/rename", renameGet);
router.post(
  "/:fileId/rename",
  validateName,
  checkFilenameValidation,
  renamePost,
);
router.get("/:fileId/delete", deleteGet);

module.exports = router;
