import {CommandResult} from "../sharedkernel/application/CommandResult";
import {isDefined, isNotDefined} from "../utils";
import {OfferRepository} from "./OfferRepository";
import {AddOffer} from "./AddOffer";
import {RoomOffer} from '../roomoffers/OfferRepository'
import { RoomOfferRepository } from "../roomsearch/RoomOfferRepository";

export class RoomOffersService {

    constructor(private offerRepository: OfferRepository) {
    }

    addOffer(command: AddOffer): Promise<CommandResult> {
        return this.offerRepository.save({...command})
            .then(() => CommandResult.success())
            .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
    }
    findById(id: string): Promise<RoomOffer | null> {
        return this.offerRepository.findById(id);
    }
}