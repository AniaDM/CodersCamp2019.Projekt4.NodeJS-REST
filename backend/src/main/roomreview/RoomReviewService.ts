import {AddRoomReviewCommand} from "./AddRoomReviewCommand";
import {CommandResult} from "../sharedkernel/application/CommandResult";
import {isDefined} from "../utils";
import {RoomReviewRepository} from "./RoomReviewRepository";
import * as uuid from "uuid";
import {RoomReview} from "./RoomReview";

export class RoomReviewService {

    constructor(private roomReviewRepository: RoomReviewRepository) {
    }

    addReview(command: AddRoomReviewCommand): Promise<CommandResult> {
        return this.roomReviewRepository
            .save({_id: uuid.v4(), ...command})
            .then(() => CommandResult.success())
            .catch(e =>
                CommandResult.failureDueTo(isDefined(e.message) ? e.message : e)
            );
    }

    findAllByRoomOfferId(roomOfferId: string): Promise<RoomReview[]> {
        return this.roomReviewRepository.findAllByRoomOfferId(roomOfferId);
    }

    async getAverageRatingByRoomOfferId(roomOfferId: string): Promise<number | null> {
        const reviews = await this.roomReviewRepository.findAllByRoomOfferId(roomOfferId);
        if (reviews.length === 0) {
            return null;
        }
        const ratingSum = reviews.map(it => it.rate).map(it => it as number).reduce((r1, r2) => r1 + r2);
        return ratingSum / reviews.length;
    }


}