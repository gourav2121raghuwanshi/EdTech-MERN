// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion ',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `your otp (valid for 5 minutes) from StudyNotion for Sign Up is ${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailSender;
const nodemailer = require("nodemailer");
require('dotenv').config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host:  "smtp.gmail.com",
            port:  587, // default to port 587 if not set
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            // from: `"StudyNotion" <${process.env.MAIL_USER}>`, // sender address
            from: 'abcd6260gourav@gmail.com',
            to: email, // list of receivers
            subject: title, // Subject line
            html: `Your OTP (valid for 5 minutes) from StudyNotion for Sign Up is ${body}`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: %s", error.message);
        throw new Error("Could not send email"); // Optionally, rethrow the error to be handled by the caller
    }
};

module.exports = mailSender;
