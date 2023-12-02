require("dotenv").config();
const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");
var cloudinary = require("cloudinary").v2;

exports.uploadImageService = async (data_uri, res) => {
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      data_uri,
      {
        resource_type: "image",
        folder: "ec-file",
      }
    );

    return {
      public_id,
      secure_url,
    };
  } catch (err) {
    console.log(
      "🚀 ~ file: cloudinary.js:5 ~ exports.uploadImageService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.deleteImageService = async (publicId) => {
  try {
    const data = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return data;
  } catch (err) {
    console.log(
      "🚀 ~ file: cloudinary.js:22 ~ exports.deleteImage ~ err:",
      err
    );
  }
};
