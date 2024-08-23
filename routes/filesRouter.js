const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { Router } = require("express");
const {
  uploadGet,
  uploadLog,
  filesGet,
} = require("../controllers/filesController");
const router = Router();

router.get("/", filesGet);
router.get("/upload", uploadGet);
router.post("/upload", upload.single("file"), uploadLog);

module.exports = router;
