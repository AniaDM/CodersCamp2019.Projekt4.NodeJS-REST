import {CommandResult} from "../sharedkernel/application/CommandResult";
import {EmailSender} from "../emailmessage/EmailSender";



function sendforReview(emailSender:EmailSender){

emailSender.execute(command:{
    recipient:`${recipient}`,
    subject:'express you opinion',
    content:`please express you opinion and click below ${}`
})

}
//
