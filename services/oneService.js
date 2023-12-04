const OTPModel = require("../models/OTPModel");
const { dataHashing, dateInMilliseconds } = require("../utils/commonFunction");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const bcrypt = require("bcryptjs");

exports.createOTPService = async ({ err, res, data: { otp, email } }) => {
  try {
    if (err) {
      console.log("Error " + err);
      return errorResponse({
        res,
        responseDetails: responseMessage("ER007"),
      });
    } else {
      const hashedOTP = dataHashing(otp);
      const newOTP = await OTPModel({
        otp: hashedOTP,
        ref_user_email: email,
        expiry_at: new Date(Date.now() + dateInMilliseconds(6)),
      });
      await newOTP.save();
      return successResponse({
        res,
        responseDetails: responseMessage("OK007"),
      });
    }
  } catch (err) {
    console.log("🚀 ~ file: OTPService.js:6 ~ exports.createOTP= ~ err:", err);
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.verifyOTPService = async (res, { email, otp }) => {
  try {
    const getOTPDocument = await OTPModel.aggregate([
      {
        $match: {
          ref_user_email: email,
        },
      },
      {
        $sort: {
          issued_at: -1,
        },
      },
    ]).limit(1);

    if (!getOTPDocument.length) {
      return errorResponse({ res, responseDetails: responseMessage("ER008") });
    }
    const hash = bcrypt.compareSync(otp, getOTPDocument[0].otp);

    if (!hash) {
      return errorResponse({
        res,
        responseDetails: responseMessage("ER009"),
        status: 400,
      });
    }

    return { is_otp_verified: true };
  } catch (err) {
    console.log(
      "🚀 ~ file: OTPService.js:47 ~ exports.verifyOTPService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
