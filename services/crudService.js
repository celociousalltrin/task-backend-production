const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createService = async (db, data) => {
  try {
    const newData = await db(data);
    const createdData = await newData.save();
    return createdData;
  } catch (err) {
    console.log(
      "🚀 ~ file: crudService.js:6 ~ exports.createService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
