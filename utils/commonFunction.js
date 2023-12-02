const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateAccessToken = (data, expiresIn = "15m") => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};

const generateRefreshToken = (data, expiresIn) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn });
};

const assignRefreshTokeninCookie = (res, data, expiresIn = "12h") => {
  res.cookie("refresh_token", generateRefreshToken(data, expiresIn), {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 12 * 60 * 60 * 1000,
  });
};

const tokenVerification = (err, decoded, token, req) => {
  switch (err?.name) {
    case "JsonWebTokenError":
      return err?.name;
    case "TokenExpiredError":
      if (token === "accessToken") {
        req.new_access_token = generateAccessToken({
          email: decoded?.email,
        });
      } else {
        return { refresh_token_expired: true };
      }
      return { is_expired: true };
    default:
      return decoded;
  }
};

const otpLength = (len) => {
  return parseInt("1" + "0".repeat(len));
};

const OtpGenerator = (length = 4) => {
  return Math.floor(Math.random() * otpLength(length))
    .toString()
    .padStart(4, "0");
};

const dataHashing = (data) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(data, salt);
  return hash;
};

const dateInMilliseconds = (number, format = "minutes") => {
  switch (format) {
    case "seconds":
      return number * 1000;
    case "minutes":
      return number * 60 * 1000;
    case "hours":
      return number * 60 * 60 * 1000;
    case "days":
      return number * 24 * 60 * 60 * 1000;
    case "weeks":
      return number * 7 * 24 * 60 * 60 * 1000;
    case "months":
      return number * 30 * 24 * 60 * 60 * 1000;
    case "years":
      return number * 365 * 24 * 60 * 60 * 1000;
    default:
      0;
  }
};

module.exports = {
  otpLength,
  OtpGenerator,
  dataHashing,
  tokenVerification,
  assignRefreshTokeninCookie,
  generateAccessToken,
  generateRefreshToken,
  dateInMilliseconds,
};
