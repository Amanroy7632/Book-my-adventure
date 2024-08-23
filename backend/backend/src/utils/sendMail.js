// import nodemailer from "nodemailer"
// import ejs from "ejs"
// import path from "path"
// import fs from "fs"


// const transporter = nodemailer.createTransport({
//     service: process.env.SMTP_SERVICE,
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//         user: process.env.SMTP_MAIL,
//         pass: process.env.SMTP_PASSWORD
//     }
// });

// const sendMail = async (to, subject, templateData) => {

//     const templatePath = path.join(__dirname, '../views/emailTemplate.ejs');
//     const template = fs.readFileSync(templatePath, 'utf8');
//     const html = ejs.render(template, templateData);


//     const mailOptions = {
//         from: process.env.SMTP_MAIL,
//         to,
//         subject,
//         html
//     };

//     return transporter.sendMail(mailOptions);
// };
// export {sendMail}

import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Manually define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const transporter = nodemailer.createTransport({
//     service: process.env.SMTP_SERVICE,
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//         user: process.env.SMTP_MAIL,
//         pass: process.env.SMTP_PASSWORD
//     }
// });
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "soniatul2931@gmail.com",
        pass: "ekogcdzmulxsqleh"
    },
    logger: true, // Enable logging
    debug: true,   // Enable debugging
    secure:false
});


const sendMail = async (to, subject, templateData) => {

    const templatePath = path.join(__dirname, '../views/emailTemplate.ejs');
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
