import {RoomReservation} from "../../domain/RoomReservation";
import * as mongoose from "mongoose";
import { RoomReservationRepository } from "../../domain/RoomReservationRepository";
import { string } from "joi";

export class MongoRoomReservationRepository implements RoomReservationRepository {

    findById(id: string): Promise<RoomReservation | null> {
        return MongoRoomReservation.findById(id).then();    
    }

    async findByUserId(id: string): Promise<RoomReservation[]> {
        return MongoRoomReservation.find({userId: id}).then()
    }
    async findByOwner(ownerName: string): Promise<RoomReservation[]> {
        return MongoRoomReservation.find({owner: ownerName}).then()
    }
    async findByOfferId(id: string): Promise<RoomReservation[]> {
        return MongoRoomReservation.find({offerId: id}).then()
    }

    save(roomReservation: RoomReservation): Promise<RoomReservation> {
        const {_id, offerId, owner, userId, name, surname, dateCheckIn, dateCheckOut, paymentMethod, status, numberOfGuests, notice} = roomReservation;
        return new MongoRoomReservation({
            _id: _id,
            offerId,
            owner,
            userId,
            name,
            surname,
            dateCheckIn,
            dateCheckOut,
            paymentMethod,
            status,
            numberOfGuests,
            notice
        }).save()
    }

    update(roomReservation: RoomReservation): Promise<RoomReservation> {
        return MongoRoomReservation.findByIdAndUpdate(roomReservation._id, {
            name: roomReservation.name,
            surname: roomReservation.surname,
            dateCheckIn: roomReservation.dateCheckIn,
            dateCheckOut: roomReservation.dateCheckOut,
            paymentMethod: roomReservation.paymentMethod,
            status: roomReservation.status,
            numberOfGuests: roomReservation.numberOfGuests,
            notice: roomReservation.notice
        }).then()
    }

}

type MongoRoomReservation = RoomReservation & mongoose.Document

const RoomReservationSchema = new mongoose.Schema({
    _id: String,
    offerId: String,
    owner: String,
    userId: String,
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dateCheckIn: {
        type: Date,
        required: true
    },
    dateCheckOut: {
        type: Date,
        required: true,
        unique: false
    },
    paymentMethod: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 64,
        unique: false
    },
    status: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        unique: false
    },
    numberOfGuests: {
        type: Number,
        required: false,
        min: 1,
        unique: false
    },
    notice: {
        type: String,
        required: false,
        maxlength: 250,
        unique: false
    }
});

const MongoRoomReservation = mongoose.model<MongoRoomReservation>('RoomReservation', RoomReservationSchema);

