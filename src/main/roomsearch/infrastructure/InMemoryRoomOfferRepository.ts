import {RoomOfferRepository} from "../RoomOfferRepository";
import {RoomOffer} from "../RoomOffer";

export class InMemoryRoomOfferRepository implements RoomOfferRepository {

    private offers: RoomOffer[] = [
        {
            offerId: "OfferId1",
            roomLocation: "Wrocław",
            price: 25,
            numberOfGuests: 5,
            averageRating: 2.4
        },
        {
            offerId: "OfferId2",
            roomLocation: "Kraków",
            price: 28,
            numberOfGuests: 4,
            averageRating: 4.5
        },
        {
            offerId: "OfferId3",
            roomLocation: "Gdańsk",
            price: 30,
            numberOfGuests: 5,
            averageRating: 3.25
        },
        {
            offerId: "OfferId4",
            roomLocation: "Warszawa",
            price: 32,
            numberOfGuests: 2,
            averageRating: 5.0
        },
        {
            offerId: "OfferId5",
            roomLocation: "Wrocław",
            price: 22,
            numberOfGuests: 3,
            averageRating: 4.75
        },
        {
            offerId: "OfferId6",
            roomLocation: "Wrocław",
            price: 24,
            numberOfGuests: 4,
            averageRating: 4.5
        },
        {
            offerId: "OfferId7",
            roomLocation: "Kraków",
            price: 18,
            numberOfGuests: 5,
            averageRating: 3.75
        },
        {
            offerId: "OfferId8",
            roomLocation: "Warszawa",
            price: 26,
            numberOfGuests: 2,
            averageRating: 4.0
        },
        {
            offerId: "OfferId9",
            roomLocation: "Poznań",
            price: 29,
            numberOfGuests: 2,
            averageRating: 5.0
        },
        {
            offerId: "OfferId10",
            roomLocation: "Katowice",
            price: 28,
            numberOfGuests: 3,
            averageRating: 4.25
        }
    ];

    getAll(): Promise<RoomOffer[]> {
        return Promise.resolve(this.offers);
    }

}
