export class RoomOffer {
  constructor(
    public _id: string,
    public username: string,
    public isPublic: boolean,
    public roomLocation: string,
    public dateCheckIn: Date,
    public dateCheckOut: Date,
    public price: number,
    public roomPhoto: string,
    public paymentMethod: string,
    public numberOfGuests: number,
    public numberOfBeds: number,
    public numberOfGuestsPerBeds: number,
    public additionalServices?: Array<string>
  ) {}
}

export interface RoomOfferRepository {
  save(roomOffer: RoomOffer): Promise<RoomOffer>;

  update(roomOffer: RoomOffer): Promise<RoomOffer>;

  publish(roomOffer: RoomOffer): Promise<RoomOffer>;

  findByUsername(username: string): Promise<RoomOffer[]>;

  findById(offerId: string): Promise<RoomOffer> | null;

  getAll(): Promise<RoomOffer[]>
}
