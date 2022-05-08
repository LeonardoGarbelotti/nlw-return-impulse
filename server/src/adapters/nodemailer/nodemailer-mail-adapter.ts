import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "be5614f2245297",
        pass: "5a9b52a6497b3b"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <no-reply@feedget.com',
            to: 'Leozin <leonardogarbelotti.lg@gmail.com>',
            subject: subject,
            html: body,
        })
    }
}