/*import {RoomOfferRepository} from "./RoomOfferRepository";
import {RoomOffer} from "./RoomOffer";

export class RoomSearcher {

    constructor(private roomOfferRepository: RoomOfferRepository) {
    }

    async searchOffersBy(filter: OfferFilter) {
        return this.roomOfferRepository.getAll()
            .then(offers => this.filterOffersBy(offers, filter));
    }

     filterOffersBy(offers: RoomOffer[], filter: OfferFilter): RoomOffer[] {
        return offers.filter(filter.averageRating > 0)
        ||
        offers.filter(filter.averageRating == 0 || filter.averageRating == undefined || filter.averageRating == null );
    }



}

export interface OfferFilter {
    numberOfGuests?: number,
    minPrice?: number,
    maxPrice?: number,
    minAverageRating?: number,
    location?: string,
    averageRating?:number
}*/
