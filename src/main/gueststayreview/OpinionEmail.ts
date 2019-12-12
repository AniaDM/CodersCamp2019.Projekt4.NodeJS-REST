import {CommandResult} from "../sharedkernel/application/CommandResult";
import {SendEmailCommand} from "./emailmessage/SendEmailCommand";

export interface EmailSender{
    execute(command: SendEmailCommand): Promise<CommandResult>
}

function sendforReview(emailSender:EmailSender){

emailSender.execute(command:{
    recipient:`${recipient}`,
    subject:'express you opinion',
    content:`please express you opinion and click below ${}`
})

}
//
