export class RoomOffer {
  constructor(
    public _offerId: string,
    public username: string,
    public isPublic: boolean,
    public roomLocation: string,
    public dateCheckIn: string,
    public dateCheckOut: string,
    public price: number,
    public roomPhoto: string,
    public additionalServices: string[],
    public paymentMethod: string,
    public numberOfGuests: number,
    public numberOfBeds: number,
    public numberOfGuestsPerBeds: number
  ) {}
}

export interface OfferRepository {
  save(roomOffer: RoomOffer): Promise<RoomOffer>;

  update(roomOffer: RoomOffer): Promise<RoomOffer>;
}
