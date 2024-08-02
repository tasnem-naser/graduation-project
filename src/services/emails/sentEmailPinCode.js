import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js"
export const sendEmailPcode = async (email, pinCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Robabikia" <${process.env.EMAIL_NAME}>`, // sender address
    to: email,
    subject: "PIN CODE forgetting password", // list of receivers// Subject line
    html:emailTemplate(pinCode) //`<b>${pinCode}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
