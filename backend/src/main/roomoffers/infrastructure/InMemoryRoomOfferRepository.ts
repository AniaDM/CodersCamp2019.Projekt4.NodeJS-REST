import {RoomOffer} from "../RoomOfferRepository";
import {RoomOfferRepository} from "../RoomOfferRepository";
import {isDefined} from "../../utils";

export class InMemoryRoomOfferRepository implements RoomOfferRepository {

    private offers: RoomOffer[] = [
        {
            _id: "OfferId",
            username: "host",
            isPublic: false,
            roomLocation: "Wrocław",
            price: 25.25,
            roomPhoto: '',
            additionalServices: [],
            paymentMethod: '',
            numberOfGuests: 5,
            numberOfBeds: 5,
            numberOfGuestsPerBeds: 1,
            title: 'Fajne mieszkanko',
            description: 'Fajne mieszkanko',
        }
    ];

    findByUsername(username: string): Promise<RoomOffer[]> {
        return Promise.resolve(this.offers.filter(it => it.username === username));
    }


    save(roomOffer: RoomOffer): Promise<RoomOffer> {
        return Promise.resolve(this.offers[0]);
    }

    update(roomOffer: RoomOffer): Promise<RoomOffer> {
        return Promise.resolve(this.offers[0]);
    }

    publish(roomOffer: RoomOffer): Promise<RoomOffer> {
        return Promise.resolve(this.offers[0]);
    }

    findById(offerId: string): Promise<RoomOffer | null> {
        return Promise.resolve(this.offers.filter(it => it._id === offerId)[0]);
    }

    getAll(): Promise<RoomOffer[]> {
        return Promise.resolve(this.offers);
    }

}