var express = require("express");
var router = express.Router();

const {
  adminUserLogin,
  createAdminUser,
  generateEmailVerificationOTPAdminUser,
  verifyEmailVerificationOTPAdminUser,
} = require("../controllers/authAdminUserController");

router.post("/create-admin-user", createAdminUser);
router.post("/admin-user-login", adminUserLogin);
router.post(
  "/generate-email-verification-otp",
  generateEmailVerificationOTPAdminUser
);
router.post(
  "/verify-email-verification-OTP",
  verifyEmailVerificationOTPAdminUser
);

module.exports = router;
