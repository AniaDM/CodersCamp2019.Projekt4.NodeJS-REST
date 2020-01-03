import {RoomReservation} from "./RoomReservation";

export interface RoomReservationRepository {
    findById(id: string): Promise<RoomReservation | null>
    findByOfferId(id:string): Promise<RoomReservation[]>
    findByUserId(userId: string): Promise<RoomReservation[]>
    findByOwner(userName: string): Promise<RoomReservation[]>
    save(roomReservation: RoomReservation): Promise<RoomReservation>
    update(roomReservation: RoomReservation): Promise<RoomReservation>
}