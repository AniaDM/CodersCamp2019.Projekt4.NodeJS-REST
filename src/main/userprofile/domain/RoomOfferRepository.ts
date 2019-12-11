import {RoomOffer} from "./RoomOffer";

export interface RoomOfferRepository {
    findById(offerId: string): Promise<RoomOffer | null>

    save(roomOffer: RoomOffer): Promise<RoomOffer>

    update(roomOffer: RoomOffer: Promise<RoomOffer>

}
