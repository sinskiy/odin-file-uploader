const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  createGet,
  createPost,
  folderGet,
} = require("../controllers/foldersController");
const { uploadGet, uploadPost } = require("../controllers/filesController");
const { isUser } = require("../controllers/authController");
const router = Router();

router.get("/create", isUser, createGet);
router.post("/create", createPost);
router.get("/:folderId", isUser, folderGet);
router.get("/:folderId/upload", isUser, uploadGet);
router.post("/:folderId/upload", upload.single("file"), uploadPost);

module.exports = router;
