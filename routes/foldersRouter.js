const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const {
  createGet,
  createPost,
  folderGet,
  renameGet,
  renamePost,
  deleteGet,
  checkFoldernameValidation,
  checkNewFoldernameValidation,
} = require("../controllers/foldersController");
const {
  uploadGet,
  uploadPost,
  validateName,
} = require("../controllers/filesController");
const { isUser } = require("../controllers/authController");
const router = Router();

router.get("/create", isUser, createGet);
router.post("/create", validateName, checkNewFoldernameValidation, createPost);
router.get("/:folderId", folderGet);
router.get("/:folderId/rename", renameGet);
router.post(
  "/:folderId/rename",
  validateName,
  checkFoldernameValidation,
  renamePost,
);
router.get("/:folderId/upload", uploadGet);
router.post("/:folderId/upload", upload.single("file"), uploadPost);
router.get("/:folderId/delete", deleteGet);

module.exports = router;
