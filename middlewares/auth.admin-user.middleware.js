const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { tokenVerification } = require("../utils/commonFunction");
const AdminModal = require("../models/AdminUserModel");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const access_token = authorization?.split(" ")[1];

    const refresh_token = req?.cookies?.refresh_token;

    if (!access_token)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });

    if (!refresh_token)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });

    const accessTokenVerify = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => tokenVerification(err, decoded, "accessToken", req)
    );

    const refreshTokenVerify = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => tokenVerification(err, decoded, "refreshToken", req)
    );

    if (
      accessTokenVerify === "JsonWebTokenError" ||
      refreshTokenVerify === "JsonWebTokenError" ||
      refreshTokenVerify.refresh_token_expired
    ) {
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });
    }

    const userDetails = await AdminModal.findOne({
      email: refreshTokenVerify.email,
    });

    req.userDetails = userDetails;
    next();
  } catch (err) {
    console.log(
      "🚀 ~ file: auth.user.middleware.js:5 ~ module.exports= ~ err:",
      err
    );
  }
};
