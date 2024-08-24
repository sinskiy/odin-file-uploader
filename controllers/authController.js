const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { prisma } = require("../lib/prisma");
const supabase = require("../lib/supabase");

function loginGet(req, res) {
  res.render("login");
}

function logoutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

function signupGet(req, res) {
  res.render("signup");
}

const validateUser = [
  body("username")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          username: value,
        },
      });
      if (user) {
        throw new Error("Username must be unique.");
      }
    })
    .isLength({ min: 1, max: 30 })
    .withMessage("Username must be between 1 and 30 characters."),
  body("password")
    .isLength({ min: 1, max: 255 })
    .withMessage("Password must be between 1 and 255 characters."),
];
function checkUserValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup", { errors: errors.array() });
  }
  next();
}
async function signupPost(req, res, next) {
  const { username, password } = req.body;
  try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        next(err);
      }
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      const { error } = await supabase.storage.createBucket(String(user.id), {
        public: true,
        fileSizeLimit: "1MB",
      });
      if (error) {
        next(error);
      }
    });
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
}

function isUser(req, res, next) {
  if (!req.user) {
    return res.redirect("/signup");
  }
  next();
}

module.exports = {
  loginGet,
  logoutGet,
  signupGet,
  validateUser,
  checkUserValidation,
  signupPost,
  isUser,
};
