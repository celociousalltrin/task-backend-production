exports.successResponse = async ({
  res,
  responseDetails = {},
  response_data = null,
  status = 200,
}) => {
  const responseFormat = {
    status: "SUCCESS",
    response_data,
    message: responseDetails.message || null,
    code: responseDetails.code || null,
  };
  return await res.status(status).json(responseFormat);
};

exports.errorResponse = async ({ res, responseDetails = {}, status = 420 }) => {
  const responseFormat = {
    status: "ERROR",
    message: responseDetails.message || null,
    code: responseDetails.code || null,
  };
  return await res.status(status).json(responseFormat);
};

exports.notFoundResponse = function (res, message) {
  var data = {
    status: "ERROR",
    message,
  };
  return res.status(404).json(data);
};
