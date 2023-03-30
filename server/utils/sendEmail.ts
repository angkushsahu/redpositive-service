import { createTransport } from "nodemailer";
import { resolve } from "path";

export default async function sendResetEmail() {
    try {
        const transporter = createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.MAIL,
            to: process.env.DESTINATION_MAIL,
            // to: "angkushsahu2502@gmail.com",
            subject: "ENTRIES LIST",
            html: `<p>Find all the selected entries in the <strong><u>.xlsx</u></strong> file below</p>`,
            attachments: [{ filename: "entries.xlsx", path: resolve(__dirname, "../excel/entries.xlsx") }],
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: "Mail sent successfully" };
    } catch (error) {
        return { success: false, message: "Unable to send e-mail" };
    }
}
