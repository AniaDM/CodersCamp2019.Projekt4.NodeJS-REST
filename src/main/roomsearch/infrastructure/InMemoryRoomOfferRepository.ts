import {RoomOfferRepository} from "../RoomOfferRepository";
import {RoomOffer} from "../RoomOffer";

export class InMemoryRoomOfferRepository implements RoomOfferRepository {

    private offers: RoomOffer[] = [
        {
            offerId: "OfferId",
            roomLocation: "Wrocław",
            dateCheckIn: new Date(),
            dateCheckOut: new Date(),
            price: 25.25,
            numberOfGuests: 5,
            averageRating: 2.4
        }
    ];

    getAll(): Promise<RoomOffer[]> {
        return Promise.resolve(this.offers);
    }

}
