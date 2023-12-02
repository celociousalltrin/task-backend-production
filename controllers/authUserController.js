const NotificationModel = require("../models/NotificationModel");
const UserModel = require("../models/UserModel");
const { createService } = require("../services/crudService");
const { sendEmailService } = require("../services/emailService");
const {
  createOTPService,
  verifyOTPService,
} = require("../services/otpService");
const { createUserService, loginService } = require("../services/userService");
const { isValid } = require("../services/validationService");
const { OtpGenerator } = require("../utils/commonFunction");
const { emailVerificationMailOptions } = require("../utils/nodeMailerOptions");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.userLogin = [
  async (req, res) => {
    try {
      await loginService(UserModel, req.body, res, 1);
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:6 ~ err:", err);
    }
  },
];

exports.createUser = [
  async (req, res) => {
    try {
      const { body } = req;

      const isEmailExist = await isValid(UserModel, "email", body.email);

      if (!!isEmailExist) {
        return errorResponse({
          res,
          responseDetails: responseMessage("ER005"),
          status: 422,
        });
      }
      const userId = await createUserService(UserModel, body, res, 1);
      await createService(NotificationModel, { user_id: userId });
      return successResponse({
        res,
        responseDetails: responseMessage("OK001"),
      });
    } catch (err) {
      console.log("🚀 ~ file: authUserController.js:17 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.generateEmailVerificationOTPUser = [
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

exports.verifyEmailVerificationOTPUser = [
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
