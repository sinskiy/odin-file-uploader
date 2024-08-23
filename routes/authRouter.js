const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => res.render("index_rename"));

module.exports = router;
