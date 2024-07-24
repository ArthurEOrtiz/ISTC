import { User } from "@/Utilities/sharedTypes";
import nodemailer from "nodemailer";

export async function sendMail ( {
    to,
    subject,
    body
} : {
    to: User, 
    subject: string, 
    body: string 
}) {
    // send mail
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

    const transport = nodemailer.createTransport({
        host: EMAIL_HOST,
        service: 'Outlook365',
        port: Number(EMAIL_PORT),
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    });

    try {
        const testResult = await transport.verify();
        console.log("Connection to email server successful", testResult);
    } catch (error) {
        console.error("Error connecting to email server", error);
        return;
    }

    try {
        const sendResult = await
            transport.sendMail({
                from: EMAIL_USERNAME,
                to: to.email,
                subject,
                text: body
            });
        console.log("Email sent successfully", sendResult);
    } catch (error) {
        console.error("Error sending email", error);
    }

}