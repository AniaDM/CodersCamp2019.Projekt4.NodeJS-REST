export type AddOffer  = {
    _offerId: string,
    username: string,
    isPublic: boolean,
    roomLocation: string,
    dateCheckIn: string,
    dateCheckOut: string,
    price: number,
    roomPhoto: string,
    additionalServices: string[],
    paymentMethod: string,
    numberOfGuests: number,
    numberOfBeds: number,
    numberOfGuestsPerBeds: number
}