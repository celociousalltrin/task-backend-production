var express = require("express");
var router = express.Router();

const {
  userLogin,
  createUser,
  generateEmailVerificationOTPUser,
  verifyEmailVerificationOTPUser,
} = require("../controllers/authUserController");

router.post("/create-user", createUser);
router.post("/user-login", userLogin);
router.post(
  "/generate-email-verification-otp",
  generateEmailVerificationOTPUser
);
router.post("/verify-email-verification-OTP", verifyEmailVerificationOTPUser);

module.exports = router;
