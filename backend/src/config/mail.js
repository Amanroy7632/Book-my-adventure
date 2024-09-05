import { fileURLToPath } from 'url';
import path from 'path';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs';

// const transporter = nodemailer.createTransport({
//   service: process.env.SMTP_SERVICE,
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_MAIL,
//     pass: process.env.SMTP_PASSWORD
//   },
//   logger: true, // Enable logging
//   debug: true,   // Enable debugging
//   secure:false
// });

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    },
    logger: false, // Enable logging
    debug: true,   // Enable debugging
    secure:false
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendMail = async (to, subject, templateData) => {
  const templatePath = path.join(__dirname, "../views/emailTemplate.ejs");
  const template = fs.readFileSync(templatePath, 'utf8');
  const html = ejs.render(template, templateData);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to,
    subject,
    html
  };

  return transporter.sendMail(mailOptions);
};

export { sendMail };
