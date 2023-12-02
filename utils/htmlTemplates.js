const emailVerificationTemplate = ({ code }) => {
  return `<div>
      <h2 style="color: blue;">Email Verification for Registering your account</h2>
      <p>Hi,</p>
      <p>You asked to enter this confirmation code:</p>
      <h1>${code}</h1>
      </div>`;
};

module.exports = { emailVerificationTemplate };
