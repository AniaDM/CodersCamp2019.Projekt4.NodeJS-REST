import {CommandResult} from "../sharedkernel/application/CommandResult";
import {SendEmailCommand} from "./SendEmailCommand";
import * as nodemailer from 'nodemailer';
import {isDefined} from "../utils";
import config from "config";
import {DatabaseMode} from "../sharedkernel/infrastructure/DatabaseMode";

export interface EmailSender {

    execute(command: SendEmailCommand): Promise<CommandResult>
}

export class GmailEmailSender implements EmailSender {

    execute(command: SendEmailCommand): Promise<CommandResult> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.get<string>("emailsender.gmail.user"),
                pass: config.get<string>("emailsender.gmail.password")
            }
        });

        const mailOptions = {
            from: config.get<string>("emailsender.gmail.user"),
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
        console.log(config.get<string>("emailsender.onlylog.text"), command);
        return Promise.resolve(CommandResult.success());
    }
}

export enum EmailMode {
    ONLY_LOG = "onlylog",
    GMAIL = "gmail"
}

export function emailModeFrom(name: string): EmailMode {
    switch (name) {
        case EmailMode.ONLY_LOG:
            return EmailMode.ONLY_LOG;
        case EmailMode.GMAIL:
            return EmailMode.GMAIL;
        default:
            throw new Error("Invalid email mode: " + name)
    }
}
