const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: config.email.auth
});

function sendEmail(subject, text) {
  const mailOptions = {
    from: config.email.auth.user,
    to: config.recipientEmail,
    subject,
    text
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error(err);
    else console.log('Email sent:', info.response);
  });
}

module.exports = sendEmail;