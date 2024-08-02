import  jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { emailTemplate } from "./emailTemplate.js"

export const sendEmail=async(email)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_NAME,
            pass:process.env.EMAIL_PASSWORD
        }

    })
    let token=jwt.sign({email}, process.env.JWT_SECRET)
    const info=transporter.sendMail({
        from: `"Robabikia app" <${process.env.EMAIL_NAME}>`, // sender address
        to: email, // list of receivers// Subject line
        html: emailTemplate(token), // html body
    })
    console.log("Message sent: %s", info.messageId);
}