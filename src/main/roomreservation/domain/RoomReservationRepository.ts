import {RoomReservation} from "./RoomReservation";

export interface RoomReservationRepository {
    findById(id: string): Promise<RoomReservation | null>
    findByOfferId(id:string): Promise<RoomReservation[] | null>
    findByUserId(userId: string): Promise<RoomReservation[] | null>
    findByOwner(userName: string): Promise<RoomReservation[] | null>
    save(roomReservation: RoomReservation): Promise<RoomReservation>
    update(roomReservation: RoomReservation): Promise<RoomReservation>
}