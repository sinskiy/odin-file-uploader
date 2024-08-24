const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { Router } = require("express");
const {
  uploadGet,
  uploadPost,
  filesGet,
  fileGet,
  deleteGet,
} = require("../controllers/filesController");
const { isUser } = require("../controllers/authController");
const router = Router();

router.get("/", filesGet);
router.get("/upload", isUser, uploadGet);
router.post("/upload", upload.single("file"), uploadPost);
router.get("/:fileId", fileGet);
router.get("/:fileId/delete", deleteGet);

module.exports = router;
