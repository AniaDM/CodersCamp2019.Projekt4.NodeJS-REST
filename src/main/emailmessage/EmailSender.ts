import {CommandResult} from "../sharedkernel/application/CommandResult";
import { SendEmailCommand } from "./SendEmailCommand";

export interface EmailSender {

    execute(command: SendEmailCommand): Promise<CommandResult>
}

const nodemailer = require ('nodemailer')
 
class MailGunEmailSender implements EmailSender {

  execute( command: SendEmailCommand: Promise<CommandResult>) {
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
       auth: {
        user: 'bozikiart@gmail.com',
        pass: 'string' }
        })
    
    var mailOptions = {
          from :  'Room Owner <me@CodersCamp.pl>',
          to : 'boziki@gazeta.pl', 
          subject : 'Hello - re-email', 
          text: 'text text text' 
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


