import {RoomOfferRepository} from "../RoomOfferRepository";
import {RoomOffer} from "../RoomOffer";
import * as mongoose from "mongoose";

/**
 * EXPLANATION
 * TypeScript with Mongoose: https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
 */
export class MongoRoomOfferRepository implements RoomOfferRepository {

    findById(offerId: string): Promise<RoomOffer> | null {
        return MongoRoomOffer.findById(offerId).then()
    }

    getAll(): Promise<RoomOffer[]> {
        return MongoRoomOffer.find().then()
    }

    async findByUsername(username: string): Promise<RoomOffer[]> {
        return MongoRoomOffer.find({username: username}).then()
    }

    save(roomOffer: RoomOffer): Promise<RoomOffer> {
        return new MongoRoomOffer({
            _id: roomOffer._id,
            username: roomOffer.username,
            isPublic: 0,
            roomLocation: roomOffer.roomLocation,
            dateCheckIn: roomOffer.dateCheckIn,
            dateCheckOut: roomOffer.dateCheckOut,
            price: roomOffer.price,
            roomPhoto: roomOffer.roomPhoto,
            paymentMethod: roomOffer.paymentMethod,
            numberOfGuests: roomOffer.numberOfGuests,
            numberOfBeds: roomOffer.numberOfBeds,
            numberOfGuestsPerBeds: roomOffer.numberOfGuestsPerBeds,
            additionalServices: roomOffer.additionalServices,
        }).save()
    }

    update(roomOffer: RoomOffer): Promise<RoomOffer> {
        return MongoRoomOffer.findByIdAndUpdate(roomOffer._id, {
            roomLocation: roomOffer.roomLocation,
            dateCheckIn: roomOffer.dateCheckIn,
            dateCheckOut: roomOffer.dateCheckOut,
            price: roomOffer.price,
            roomPhoto: roomOffer.roomPhoto,
            paymentMethod: roomOffer.paymentMethod,
            numberOfGuests: roomOffer.numberOfGuests,
            numberOfBeds: roomOffer.numberOfBeds,
            numberOfGuestsPerBeds: roomOffer.numberOfGuestsPerBeds,
            additionalServices: roomOffer.additionalServices,
        }).then()
    }

    publish(roomOffer: RoomOffer): Promise<RoomOffer> {
        return MongoRoomOffer.findByIdAndUpdate(roomOffer._id, {
            isPublic: roomOffer.isPublic
        }).then()
    }

}

type MongoRoomOffer = RoomOffer & mongoose.Document

const roomOfferSchema = new mongoose.Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 64
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    roomLocation: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 64,
        unique: false
    },
    dateCheckIn: {
        type: Date,
        required: false
    },
    dateCheckOut: {
        type: Date,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    roomPhoto: {
        type: String,
        required: false
    },
    paymentMethod: {
        type: String,
        required: false
    },
    numberOfGuests: {
        type: Number,
        required: false
    },
    numberOfBeds: {
        type: Number,
        required: false
    },
    numberOfGuestsPerBeds: {
        type: Number,
        required: false
    },
    additionalServices: {
        type: Array,
        required: false
    }
});

const MongoRoomOffer = mongoose.model<MongoRoomOffer>('RoomOffer', roomOfferSchema);




