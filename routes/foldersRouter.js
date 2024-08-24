const { Router } = require("express");
const { createGet, createPost } = require("../controllers/foldersController");
const router = Router();

router.get("/create", createGet);
router.post("/create", createPost);

module.exports = router;
