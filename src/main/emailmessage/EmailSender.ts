require('dotenv').config();
import {CommandResult} from "../sharedkernel/application/CommandResult";
import { SendEmailCommand } from "./SendEmailCommand";
import { string } from "joi";

export interface EmailSender {

    execute(command: SendEmailCommand): Promise<CommandResult>
}

const nodemailer = require ('nodemailer')
 
class MailGunEmailSender implements EmailSender {

  execute( command: SendEmailCommand: Promise<CommandResult>) {
    
    var transporter = nodemailer.createTransport({
      service:  'gmail',
       auth: {
        user:  process.env.EMAIL,
        pass:  process.env.PASSWORD}
        })
    
    var mailOptions = {
          from : string,
          to : string, 
          subject : string, 
          text: string 
    }; 
        
    transporter.sendMail( mailOptions, (error, info) => { 
          if (error) { 
            return console.log(`error: ${error}`); 
          } 
          console.log(`Message Sent ${info.response}`); 
        }); 
}


 class ConsoleLogEmailSender implements EmailSender{

   execute(command: SendMailCommans): Promise<CommandResult> {
    
    console.log('Email logged in console', command);
    
    return Promise.resolve(CommandResult.success);
   }
 }