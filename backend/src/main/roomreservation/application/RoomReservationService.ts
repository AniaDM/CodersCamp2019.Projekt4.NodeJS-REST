import {CommandResult} from "../../sharedkernel/application/CommandResult";
import {RoomReservationRepository} from "../domain/RoomReservationRepository";
import {isDefined, isNotDefined} from "../../utils";
import {RoomReservation} from "../domain/RoomReservation";
import {CreateRoomReservation} from "./CreateRoomReservation";
import {UpdateRoomReservation} from "./UpdateRoomReservation";
import {UpdateStatusRoomReservation} from './UpdateStatusRoomReservation'

export class RoomReservationService {

    constructor(private roomReservationRepository: RoomReservationRepository) {
    }

    addRoomReservation(command: CreateRoomReservation): Promise<CommandResult> {
        return this.roomReservationRepository.save({...command})
            .then(() => CommandResult.success())
            .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
    }

    async updateRoomReservation(command: UpdateRoomReservation): Promise<CommandResult> {
        const foundReservation = await this.roomReservationRepository.findById(command._id);
        if (foundReservation) {
            foundReservation.dateCheckIn = command.dateCheckIn;
            foundReservation.dateCheckOut = command.dateCheckOut;
            foundReservation.status = command.status;
            foundReservation.notice = command.notice;
            foundReservation.numberOfGuests = command.numberOfGuests;
            foundReservation.paymentMethod = command.paymentMethod;
            return this.roomReservationRepository.update(foundReservation)
                .then(() => CommandResult.success())
                .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
        } else {
            return Promise.reject(CommandResult.failureDueTo(`Room reservation with id: ${command._id} not found!`));
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
    findRoomReservationByUserId(id: string): Promise<RoomReservation[] | null> {
        return this.roomReservationRepository.findByUserId(id);
    }

    findRoomReservationById(id: string): Promise<RoomReservation | null> {
        return this.roomReservationRepository.findById(id);
    }
    findRoomReservationByOfferId(id: string): Promise<RoomReservation[] | null> {
        return this.roomReservationRepository.findByOfferId(id);
    }
    findRoomReservationByOwner(id: string): Promise<RoomReservation[] | null> {
        return this.roomReservationRepository.findByOwner(id);
    }
}