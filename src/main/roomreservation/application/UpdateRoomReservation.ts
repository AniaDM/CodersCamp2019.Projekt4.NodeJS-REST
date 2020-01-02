export type UpdateRoomReservation  = {
    _id:string,
    dateCheckIn: string,
    dateCheckOut: string,
    status: string,
    paymentMethod?: string,
    numberOfGuests?: number,
    notice?:string
}