import {RoomReservation} from "../../domain/RoomReservation";
import * as mongoose from "mongoose";
import { RoomReservationRepository } from "../../domain/RoomReservationRepository";

export class MongoRoomReservationRepository implements RoomReservationRepository {

    async findById(id: string): Promise<RoomReservation | null> {
        return MongoUser.findById(id);
    }

    async findByUserId(id: string): Promise<RoomReservation[] | null> {
        return MongoUser.find({userId: id}).then()
    }
    async findByOwner(ownerName: string): Promise<RoomReservation[] | null> {
        return MongoUser.find({owner: ownerName}).then()
    }
    async findByOfferId(id: string): Promise<RoomReservation[] | null> {
        return MongoUser.find({offerId: id}).then()
    }

    save(roomReservation: RoomReservation): Promise<RoomReservation> {
        const {_id, offerId, owner, userId, dateCheckIn, dateCheckOut, paymentMethod, status, numberOfGuests, notice} = roomReservation;
        return new MongoUser({
            _id: _id,
            offerId,
            owner,
            userId,
            dateCheckIn,
            dateCheckOut,
            paymentMethod,
            status,
            numberOfGuests,
            notice
        }).save()
    }

    update(roomReservation: RoomReservation): Promise<RoomReservation> {
        return MongoUser.findByIdAndUpdate(roomReservation._id, {
            dateCheckIn: roomReservation.dateCheckIn,
            dateCheckOut: roomReservation.dateCheckOut,
            paymentMethod: roomReservation.paymentMethod,
            status: roomReservation.status,
            numberOfGuests: roomReservation.numberOfGuests,
            notice: roomReservation.notice
        }).then()
    }

}

type MongoUser = RoomReservation & mongoose.Document

const RoomReservationSchema = new mongoose.Schema({
    _id: String,
    offerId: String,
    owner: String,
    userId: String,
    dateCheckIn: {
        type: Date,
        required: true,
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

const MongoUser = mongoose.model<MongoUser>('RoomReservation', RoomReservationSchema);

