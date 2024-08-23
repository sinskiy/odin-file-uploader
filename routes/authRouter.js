const { Router } = require("express");
const passport = require("passport");
const {
  signupGet,
  validateUser,
  checkUserValidation,
  signupPost,
  loginGet,
  logoutGet,
} = require("../controllers/authController");
const router = Router();

router.get("/login", loginGet);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/");
  },
);

router.get("/logout", logoutGet);

router.get("/signup", signupGet);
router.post("/signup", validateUser, checkUserValidation, signupPost);

module.exports = router;
