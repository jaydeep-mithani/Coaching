const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL_SERVICE_MAIL_ID,
    pass: process.env.EMAIL_SERVICE_MAIL_PASS,
  },
});

const sendEmail = (options) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = sendEmail;
