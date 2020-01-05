export type CreateRoomReservation  = {
    _id:string,
    offerId: string,
    owner: string,
    userId: string,
    name: string,
    surname:string,
    dateCheckIn: string,
    dateCheckOut: string,
    paymentMethod: string,
    status: string,
    numberOfGuests: number,
    notice?:string
}