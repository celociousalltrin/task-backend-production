const { errorResponse, successResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
const { uploadImageService } = require("./imageUpload.js");
const bcrypt = require("bcryptjs");

const {
  dataHashing,
  assignRefreshTokeninCookie,
  generateAccessToken,
} = require("../utils/commonFunction.js");

exports.createUserService = async (db, userData, res, type) => {
  try {
    const { password, image_uri, ...rest } = userData;

    if (type === 1) {
      var cloudinaryImage = await uploadImageService(image_uri, res);
    }

    const hassedPassword = dataHashing(password);

    const newUser = await db({
      ...rest,
      ...(type === 1 && { user_image: cloudinaryImage }),
      password: hassedPassword,
    });

    const { _id } = await newUser.save();
    return _id;
  } catch (err) {
    console.log(
      "🚀 ~ file: userService.js:5 ~ exports.createUserService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.loginService = async (db, userData, res, type) => {
  console.log(
    "🚀 ~ file: userService.js:40 ~ exports.loginService= ~ type:",
    type
  );
  try {
    const { email, password } = userData;
    const getUser = await db.findOne({
      email,
    });

    if (!getUser)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER002"),
        status: 404,
      });

    const hash = bcrypt.compareSync(password, getUser.password);

    if (!hash) {
      return errorResponse({
        res,
        responseDetails: responseMessage("ER003"),
        status: 404,
      });
    }
    assignRefreshTokeninCookie(res, { email: getUser.email });

    const result = {
      name: getUser.name,
      email: getUser.email,
      ...(type === 1 && { user_image: getUser.user_image.secure_url }),
      access_token: generateAccessToken({ email: getUser.email }),
      phone_number: getUser.phone_number,
      is_admin: type === 1 ? false : true,
    };

    return successResponse({
      res,
      responseDetails: responseMessage("OK003"),
      response_data: result,
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: authUserService.js:39 ~ exports.loginService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
