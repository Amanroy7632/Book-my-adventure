import nodemailer from "nodemailer"
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } = require('../config/config');

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false, // Use TLS
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

const sendActivationEmail = async (to, activationLink) => {
    const mailOptions = {
        from: EMAIL_FROM,
        to,
        subject: 'Activate Your Account',
        text: `Your activation link is ${activationLink}`
    };

    await transporter.sendMail(mailOptions);
};
export {sendActivationEmail}