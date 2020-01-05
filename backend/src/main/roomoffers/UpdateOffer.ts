export type UpdateOffer = {
  _id: string;
  roomLocation: string;
  dateCheckIn?: string;
  dateCheckOut?: string;
  price: number;
  roomPhoto: string;
  additionalServices?: Array<string>;
  paymentMethod?: string;
  numberOfGuests: number;
  numberOfBeds: number;
  numberOfGuestsPerBeds?: number;
  title: string,
  description: string,
};
