import {RoomRating} from "./RoomRating";

export interface RoomReview {
    _id: string;
    userId: string;
    roomOfferId: string;
    rate: RoomRating;
    content?: string;
}