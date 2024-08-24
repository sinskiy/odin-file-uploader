const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  createGet,
  createPost,
  folderGet,
} = require("../controllers/foldersController");
const { uploadGet, uploadPost } = require("../controllers/filesController");
const router = Router();

router.get("/create", createGet);
router.post("/create", createPost);
router.get("/:folderId", folderGet);
router.get("/:folderId/upload", uploadGet);
router.post("/:folderId/upload", upload.single("file"), uploadPost);

module.exports = router;
