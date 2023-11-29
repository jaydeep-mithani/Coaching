const express = require("express");
const {
  validateRegistration,
  validateLogin,
  validateEmail,
} = require("../middlewares/validation");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", validateRegistration, authController.register);

router.post("/login", validateLogin, authController.login);

router.get("/verify/:token", authController.verify);

router.post(
  "/request-password-reset",
  validateEmail,
  authController.requestPasswordReset
);

router.post("/reset-password", authController.resetPassword);

module.exports = router;
