require('dotenv').config();
import { CommandResult } from "../sharedkernel/application/CommandResult";
import { SendEmailCommand } from "./SendEmailCommand";
import { string } from "joi";

export interface EmailSender {

  execute(command: SendEmailCommand): Promise < CommandResult >
}

const nodemailer = require('nodemailer')

class nodemailerEmailSender implements EmailSender {

  execute(command: SendEmailCommand): Promise < CommandResult >    {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: SendEmailCommand.recipient,
      subject: SendEmailCommand.subject,
      text: SendEmailCommand.content
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(`Message Sent ${info.response}`);
    });
  }

  class ConsoleLogEmailSender implements EmailSender {

    execute(command: SendEmailCommand): Promise < CommandResult > {

      console.log('Email logged in console', command);

      return Promise.resolve(CommandResult.success);
    }
  }