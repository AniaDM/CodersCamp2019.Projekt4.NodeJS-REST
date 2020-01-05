import {CommandResult} from "../../sharedkernel/application/CommandResult";
import {RoomReservationRepository} from "../domain/RoomReservationRepository";
import {isDefined, isNotDefined} from "../../utils";
import {RoomReservation} from "../domain/RoomReservation";
import {CreateRoomReservation} from "./CreateRoomReservation";
import {UpdateStatusRoomReservation} from './UpdateStatusRoomReservation'

export class RoomReservationService {

    constructor(private roomReservationRepository: RoomReservationRepository) {
    }

    async makeRoomReservation(command: CreateRoomReservation): Promise<CommandResult> {
        const reservations = await this.findRoomReservationByOfferId(command.offerId);
        const dateCheckIn = new Date(command.dateCheckIn);
        const dateCheckOut = new Date(command.dateCheckOut);
        const alreadyExists = reservations.find(it => {
            it.status === "approved" &&
            dateCheckIn <= new Date(it.dateCheckIn) && dateCheckOut > new Date(it.dateCheckIn) ||
            dateCheckIn > new Date(it.dateCheckIn) && dateCheckIn < new Date(it.dateCheckOut);
        });
        if (alreadyExists) {
            return Promise.reject(CommandResult.failureDueTo('Room is already booked!'));
        } else {
        return this.roomReservationRepository.save({...command})
            .then(() => CommandResult.success())
            .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
        }
    }

   

    async updateStatusRoomReservation(command: UpdateStatusRoomReservation): Promise<CommandResult> {
        const foundReservation = await this.roomReservationRepository.findById(command._id);
        if (foundReservation) {
            foundReservation.status = command.status;
            return this.roomReservationRepository.update(foundReservation)
                .then(() => CommandResult.success())
                .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
        } else {
            return Promise.reject(CommandResult.failureDueTo(`Room reservation with id: ${command._id} not found!`));
        }
    }

    findRoomReservationByUserId(id: string): Promise<RoomReservation[]> {
        return this.roomReservationRepository.findByUserId(id);
    }

    findRoomReservationById(id: string): Promise<RoomReservation | null> {
        return this.roomReservationRepository.findById(id);
    }

    findRoomReservationByOfferId(id: string): Promise<RoomReservation[]> {
        return this.roomReservationRepository.findByOfferId(id);
    }

    findRoomReservationByOwner(id: string): Promise<RoomReservation[]> {
        return this.roomReservationRepository.findByOwner(id);
    }
}