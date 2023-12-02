const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.isValid = async (db, fieldName, value) => {
  try {
    const user = await db.findOne({
      [fieldName]: value,
    });

    return user;
  } catch (err) {
    console.log(
      "🚀 ~ file: validationService.js:9 ~ exports.isValid= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
