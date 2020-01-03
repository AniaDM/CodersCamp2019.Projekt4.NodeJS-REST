import {RoomReview} from "./RoomReview";

export interface RoomReviewRepository {
    save(roomReview: RoomReview): Promise<RoomReview>;

    findAllByRoomOfferId(roomOfferId: string): Promise<RoomReview[]>;
}
