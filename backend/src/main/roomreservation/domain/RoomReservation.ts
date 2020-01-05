export class RoomReservation {

    constructor(
        public _id:string,
        public offerId: string,
        public owner: string,
        public userId: string,
        public name: string,
        public surname: string,
        public dateCheckIn: string,
        public dateCheckOut: string,
        public paymentMethod: string,
        public status: string,
        public numberOfGuests: number,
        public notice?: string) {
}

}
