export interface RoomOffer {
    offerId: string,
    roomLocation: string,
    price: number,
    numberOfGuests: number,
    averageRating: number,
    title?: string, //TODO: Make title mandatory!
    description?: string
}
