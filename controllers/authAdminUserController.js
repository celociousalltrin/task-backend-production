const AdminUserModel = require("../models/AdminUserModel");
const { sendEmailService } = require("../services/emailService");
const {
  createOTPService,
  verifyOTPService,
} = require("../services/OTPService");
const { createUserService, loginService } = require("../services/userService");
const { isValid } = require("../services/validationService");
const { OtpGenerator } = require("../utils/commonFunction");
const { emailVerificationMailOptions } = require("../utils/nodeMailerOptions");
const { successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createAdminUser = [
  async (req, res) => {
    try {
      const { body } = req;

      const isEmailExist = await isValid(AdminUserModel, "email", body.email);

      if (!!isEmailExist) {
        return errorResponse({
          res,
          responseDetails: responseMessage("ER005"),
          status: 422,
        });
      }
      await createUserService(AdminUserModel, body, res, 2);
      return successResponse({
        res,
        responseDetails: responseMessage("OK002"),
      });
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:17 ~ err:", err);
    }
  },
];

exports.adminUserLogin = [
  async (req, res) => {
    try {
      await loginService(AdminUserModel, req.body, res, 2);
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:6 ~ err:", err);
    }
  },
];

exports.generateEmailVerificationOTPAdminUser = [
  async (req, res) => {
    try {
      const { email } = req.body;
      const otp = OtpGenerator();
      const mailOption = emailVerificationMailOptions(otp, email);
      await sendEmailService(mailOption, res, createOTPService, {
        email,
        otp,
      });
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:76 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.verifyEmailVerificationOTPAdminUser = [
  async (req, res) => {
    try {
      const result = await verifyOTPService(res, req.body);
      return successResponse({
        res,
        responseDetails: responseMessage("OK008"),
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:76 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
