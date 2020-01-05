export class RoomOffer {
    constructor(
        public _id: string,
        public username: string,
        public isPublic: boolean,
        public roomLocation: string,
        public price: number,
        public numberOfGuests: number,
        public numberOfBeds: number,
        public title: string,
        public description: string,
        public numberOfGuestsPerBeds?: number,
        public additionalServices?: Array<string>,
        public paymentMethod?: string,
        public roomPhoto?: string,
    ) {
    }
}

export interface RoomOfferRepository {
    save(roomOffer: RoomOffer): Promise<RoomOffer>;

    update(roomOffer: RoomOffer): Promise<RoomOffer>;

    publish(roomOffer: RoomOffer): Promise<RoomOffer>;

    findByUsername(username: string): Promise<RoomOffer[]>;

    findById(offerId: string): Promise<RoomOffer | null>;

    getAll(): Promise<RoomOffer[]>;
}
