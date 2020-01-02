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
    public numberOfGuests: number,
    public numberOfBeds: number,
    public numberOfGuestsPerBeds: number,
    public additionalServices?: Array<string>
  ) {}
}

export interface OfferRepository {
  save(roomOffer: RoomOffer): Promise<RoomOffer>;
  findById(id: string): Promise<RoomOffer | null>
  update(roomOffer: RoomOffer): Promise<RoomOffer>;
}
