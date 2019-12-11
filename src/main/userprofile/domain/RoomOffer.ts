export class RoomOffer {

    constructor(public offerId: string,
                public roomLocation: string,
                public dateCheckIn: Date,
                public dateCheckOut: Date,
                public price: number,
                public roomPhoto: Array,
                public additionalServices: Array,
                public paymentMethod: Array,
                public numberOfGuests: number,
                public numberOfBeds: number,
                public numberOfGuestsPerBeds: number,
                public averageRating: number) {
    }

}
