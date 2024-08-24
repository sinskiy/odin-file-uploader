const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { Router } = require("express");
const {
  uploadGet,
  uploadPost,
  filesGet,
} = require("../controllers/filesController");
const { isUser } = require("../controllers/authController");
const router = Router();

router.get("/", filesGet);
router.get("/upload", isUser, uploadGet);
router.post("/upload", upload.single("file"), uploadPost);

module.exports = router;
