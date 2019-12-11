import {CommandResult} from "../sharedkernel/application/CommandResult";

export interface EmailSender {

    execute(command: SendEmailCommand): Promise<CommandResult>

}
const textMail='We confirm your reservation: '; //potwierdzenie rezerwacji
const nodemailer = require ('nodemailer')

//u Kamila to samo!!!!
let transporter = nodemailer.createTransport({
    auth: {
        api_key: '3b131fb4448f106936702baa0784a2ad-5645b1f9-efed18c9',
        domain: 'sandbox431c4ae01721472484bbb0d86cbfb6c2.mailgun.org'
    }
});

let mailOptionReservation = {
    from: 'me@CodersCamp.pl',
    to: 'info@boziki.pl', // dla testu Ma byc mail klienta wyszkukany po name lub ID
    subject: 'Reservation confirmation',
    text: textMail // dodatkowe dane odnośnie klienta: termin rezerwacji, ilość osób i pokoi, opcje dodatkowe.
};

transporter.sendMail(mailOptionReservation, function(err,data){
    if(err) {
        console.log('Err is error', err);
    } else {
        console.log('Email ok!');
    }
})t