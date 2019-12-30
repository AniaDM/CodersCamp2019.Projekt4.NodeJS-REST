import {EmailSender} from "../emailmessage/EmailSender";
import {CommandResult} from "../sharedkernel/application/CommandResult";
import {UserProfile} from "../userprofile/domain/UserProfile";
import {RoomOffer} from "../roomsearch/RoomOffer";


export function sendForReview(emailSender: EmailSender, userProfile: UserProfile, roomOffer: RoomOffer): Promise<CommandResult> {
    return emailSender.execute({
        recipient: userProfile.email,
        subject: 'Express your opinion about room',
        content: `Please click the link ${generateLinkToRoomReview()} to express opinion about your last stay in ${roomOffer.title}`
    });
}

//TODO: Implement after frontend
function generateLinkToRoomReview(): string {
    return 'frontendUrl';
}
