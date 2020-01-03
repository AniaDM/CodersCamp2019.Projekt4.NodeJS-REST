import {isDefined} from "../../../utils";
import * as _ from 'lodash';
import { RoomReservationRepository } from "../../domain/RoomReservationRepository";
import { RoomReservation } from "../../domain/RoomReservation";

export class InMemoryRoomReservationRepository implements RoomReservationRepository {

    private repository: RoomReservation[] = [];

    findByUserId(id: string): Promise<RoomReservation[] | null> {
        const found = this.repository.find(it => it.userId === id);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.resolve(null);
    }

    findById(id: string): Promise<RoomReservation | null> {
        const found = this.repository.find(it => it._id === id);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.resolve(null);
    }
    findByOfferId(id: string): Promise<RoomReservation[] | null> {
        const found = this.repository.find(it => it.offerId === id);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.resolve(null);
    }
    findByOwner(ownerName: string): Promise<RoomReservation[] | null> {
        const found = this.repository.find(it => it.owner === ownerName);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.resolve(null);
    }
    save(roomReservation: RoomReservation): Promise<RoomReservation> {
        const alreadyExists = this.repository.find(it => it._id);
        if (alreadyExists) {
            return Promise.reject(new Error("Already saved!"));
        } else {
            this.repository.push(roomReservation);
            return Promise.resolve(roomReservation);
        }
    }

    async update(roomReservation: RoomReservation): Promise<RoomReservation> {
        const foundReservation = await this.findById(roomReservation._id);
        if (isDefined(foundReservation)) {
            _.remove(this.repository, p => p._id === roomReservation._id);
            return this.save(roomReservation);
        } else {
            return Promise.reject(new Error("Not found!"));
        }
    }


}
