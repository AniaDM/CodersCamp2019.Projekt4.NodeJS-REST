import {RoomOfferRepository} from "./RoomOfferRepository";
import {RoomOffer} from "./RoomOffer";

export class RoomSearcher {

    constructor(private roomOfferRepository: RoomOfferRepository) {
    }

    async searchOffersBy(filter: OfferFilter) {
        return this.roomOfferRepository.getAll()
            .then(offers => this.filterOffersBy(offers, filter));
    }

    private filterOffersBy(offers: RoomOffer[], filter: OfferFilter): RoomOffer[] {
        return offers
            .filter(offer => !filter.maxPrice || offer.price <= filter.maxPrice)
            .filter(offer => !filter.minPrice || offer.price >= filter.minPrice)
            .filter(offer => !filter.numberOfGuests || offer.numberOfGuests >= filter.numberOfGuests)
            .filter(offer => !filter.minAverageRating || offer.averageRating >= filter.minAverageRating)
            .filter(offer => !filter.location || offer.roomLocation === filter.location);
    }


}

export interface OfferFilter {
    numberOfGuests?: number,
    minPrice?: number,
    maxPrice?: number,
    minAverageRating?: number,
    location?: string
}

