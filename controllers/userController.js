const { successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.verifieduser = [
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
