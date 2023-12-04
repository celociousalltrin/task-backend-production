const NotificationModel = require("../models/NotificationModel");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.getNotificationList = [
  async (req, res) => {
    try {
      const result = await NotificationModel.aggregate([
        {
          $match: {
            is_clear: false,
          },
        },
        {
          $lookup: {
            from: "users",
            let: {
              id: "$user_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$id"],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  name: 1,
                  email: 1,
                  user_image: 1,
                },
              },
            ],
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      return successResponse({
        res,
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: notificationController.js:14 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.readNotification = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await NotificationModel.findByIdAndUpdate(
        { _id: id },
        { $set: { is_read: true } },
        { new: true }
      );

      return successResponse({
        res,
        responseDetails: responseMessage("OK009"),
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: notificationController.js:24 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.clearSingleNotification = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await NotificationModel.findByIdAndDelete(
        { _id: id },
        { $set: { is_clear: true } },
        { new: true }
      );
      return successResponse({
        res,
        responseDetails: responseMessage("OK011"),
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: notificationController.js:46 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

exports.clearNotifications = [
  async (req, res) => {
    const { ids } = req.body;
    try {
      const result = await NotificationModel.updateMany(
        { _id: { $in: ids } },
        { $set: { is_read: true, is_clear: true } }
      );

      return successResponse({
        res,
        responseDetails: responseMessage("OK010"),
        response_data: result,
      });
    } catch (err) {
      console.log("🚀 ~ file: notificationController.js:24 ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
