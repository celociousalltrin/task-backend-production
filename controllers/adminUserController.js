const { findOneAndUpdate } = require("../models/NotificationModel");
const UserModel = require("../models/UserModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.getUserList = [
  async (req, res) => {
    try {
      const result = await UserModel.find({}).select(
        "name email createdAt user_image phone_number _id"
      );
      return successResponse({ res, response_data: result });
    } catch (err) {
      console.log("🚀 ~ file: adminUserController.js:6 ~ async ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.deleteUser = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await findOneAndUpdate(
        { _id: id },
        { is_admin_deleted: true },
        { new: true }
      );
      return successResponse({
        res,
        response_data: result,
        responseDetails: responseDetails("OK005"),
      });
    } catch (err) {
      console.log("🚀 ~ file: adminUserController.js:20 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.verifiedAdminuser = [
  async (req, res) => {
    try {
      return successResponse({
        res,
        responseDetails: responseMessage("OK004"),
      });
    } catch (err) {
      console.log(
        "🚀 ~ file: userController.js:5 ~ exports.verifieduser=[ ~ err:",
        err
      );
    }
  },
];
