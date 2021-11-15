const nodemailer = require("nodemailer");
const {
  mailRegisterTemplate,
  mailForgetPassWordTemplate,
  mailTeacherInvitationTemplate,
} = require("./mail.template");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: process.env.GMAIL_ACCOUNT,
    // password: process.env.GMAIL_PASSSWORD,
    user: "nguyenanhtuan12454@gmail.com",
    pass: "Sweet2110",
  },
});

exports.sendMailRegister = (data) => {
  // console.log(data.email);
  let mailOptions = {
    from: "nguyenanhtuan12454@gmail.com",
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
    from: "nguyenanhtuan12454@gmail.com",
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
    from: "nguyenanhtuan12454@gmail.com",
    to: data.email,
    subject: "[Invitation to co-teach]",
    html: mailTeacherInvitationTemplate(data),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
