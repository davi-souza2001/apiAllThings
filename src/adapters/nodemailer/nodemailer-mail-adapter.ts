import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "265de75e0c8a98",
        pass: "c1e7ccec2a9ed5"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equite Feedget <oi@feedget.com>',
            to: 'Davi Souza <davisouza2001dv@gmail.com>',
            subject,
            html: body
        });
    };
}