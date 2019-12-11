import {RoomOffer} from "./RoomOffer";

export interface RoomOfferRepository {
    getAll(): Promise<RoomOffer[]>
}
