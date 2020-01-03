import {RoomRating} from "./RoomRating";

export type AddRoomReviewCommand = {
    userId: string;
    roomOfferId: string;
    rate: RoomRating;
    content?: string;
};