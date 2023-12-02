const { successResponse, errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.logout = [
  async (req, res) => {
    try {
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return successResponse({
        res,
        responseDetails: responseMessage("OK006"),
      });
    } catch (err) {
      console.log("🚀 ~ file: logoutController.js:6 ~ async ~ err:", err);
      return errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
