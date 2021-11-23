const nodemailer = require("nodemailer");
const {
  mailRegisterTemplate,
  mailForgetPassWordTemplate,
  mailTeacherInvitationTemplate,
  mailStudentInvitationTemplate,
} = require("./mail.template");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSSWORD,
  },
});

exports.sendMailRegister = (data) => {
  // console.log(data.email);
  let mailOptions = {
    from: process.env.GMAIL_ACCOUNT,
    to: data.email,
    subject: "[Register Class Room]",
    html: mailRegisterTemplate(data),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
exports.sendMailForgetPassword = (data) => {
  console.log(data.email);
  let mailOptions = {
    from: process.env.GMAIL_ACCOUNT,
    to: data.email,
    subject: "[RESET Password Class Room]",
    html: mailForgetPassWordTemplate(data),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.sendMailTeacherInvitation = (data) => {
  const mailOptions = {
    from: process.env.GMAIL_ACCOUNT,
    to: data.email,
    subject: "[Invitation to co-teach]",
    html: mailTeacherInvitationTemplate(data),
  };

  return transporter.sendMail(mailOptions);
};
exports.sendMailStudentInvitation = (data) => {
  const mailOptions = {
    from: process.env.GMAIL_ACCOUNT,
    to: data.email,
    subject: "[Invitation to class]",
    html: mailStudentInvitationTemplate(data),
  };

  return transporter.sendMail(mailOptions);
};
