const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const { Router } = require("express");
const {
  uploadGet,
  uploadPost,
  filesGet,
  fileGet,
  filePost,
  renameGet,
  deleteGet,
  renamePost,
} = require("../controllers/filesController");
const { isUser } = require("../controllers/authController");
const router = Router();

router.get("/", filesGet);
router.get("/upload", isUser, uploadGet);
router.post("/upload", upload.single("file"), uploadPost);
router.get("/:fileId", fileGet);
router.post("/:fileId", filePost);
router.get("/:fileId/rename", renameGet);
router.post("/:fileId/rename", renamePost);
router.get("/:fileId/delete", deleteGet);

module.exports = router;
