import {CommandResult} from "../sharedkernel/application/CommandResult";
import {SendEmailCommand} from "./SendEmailCommand";
import * as nodemailer from 'nodemailer';
import {isDefined} from "../utils";

export interface EmailSender {

    execute(command: SendEmailCommand): Promise<CommandResult>
}

export class NodemailerEmailSender implements EmailSender {

    execute(command: SendEmailCommand): Promise<CommandResult> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: command.recipient,
            subject: command.subject,
            text: command.content
        };

        return transporter.sendMail(mailOptions)
            .then(() => CommandResult.success())
            .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
    }

}

export class ConsoleLogEmailSender implements EmailSender {

    execute(command: SendEmailCommand): Promise<CommandResult> {
        console.log('Email logged in console', command);
        return Promise.resolve(CommandResult.success());
    }
}
