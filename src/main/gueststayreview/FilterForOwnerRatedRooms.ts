import {RoomOfferRepository} from "./RoomOfferRepository";
import {RoomOffer} from "./RoomOffer";

export class RoomSearcher {

    constructor(private roomOfferRepository: RoomOfferRepository) {
    }

    async searchOffersBy(filter: OfferFilter) {
        return this.roomOfferRepository.getAll()
            .then(offers => this.filterOffersBy(offers, filter));
    }

     filterOffersBy(offers: RoomOffer[], filter: OfferFilter): RoomOffer[] {
         if(this.owner == true){
        return offers.filter(filter.averageRating > 0)
         }
    }



}

export interface OfferFilter {
    numberOfGuests?: number,
    minPrice?: number,
    maxPrice?: number,
    minAverageRating?: number,
    location?: string,
    owner?:boolean,
    averageRating?:number
}