import {CommandResult} from "../sharedkernel/application/CommandResult";
import {GuestOpinion, OfferRepository} from "../roomoffers/OfferRepository";
import {AddRoomOpinionCommand} from "./AddRoomOpinionCommand";
import {isDefined, isNotDefined} from "../utils";

export class RoomOpinionService {

    constructor(private offerRepository: OfferRepository) {
    }

    async addOpinion(command: AddRoomOpinionCommand): Promise<CommandResult> {
        const roomOffer = await this.offerRepository.findById(command.offerId);
        if (isNotDefined(roomOffer)) {
            return CommandResult.failureDueTo(`Room offer with id ${command.offerId} not found!`);
        }
        const opinion = new GuestOpinion(
            command.userId,
            command.rate,
            command.content
        );
        roomOffer.guestOpinions.push(opinion);

        return this.offerRepository
            .save(roomOffer)
            .then(() => CommandResult.success())
            .catch(e =>
                CommandResult.failureDueTo(isDefined(e.message) ? e.message : e)
            );
    }

}
