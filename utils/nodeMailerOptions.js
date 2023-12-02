const { emailVerificationTemplate } = require("./htmlTemplates");

const emailVerificationMailOptions = (code, email) => {
  return {
    to: email,
    subject: `${code} is your Confirmation Code`,
    html: emailVerificationTemplate({ code }),
  };
};

module.exports = {
  emailVerificationMailOptions,
};
