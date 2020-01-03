import {RoomReviewRepository} from "../RoomReviewRepository";
import {RoomReview} from "../RoomReview";
import * as mongoose from "mongoose";

export class MongoRoomReviewRepository implements RoomReviewRepository {

    findAllByRoomOfferId(roomOfferId: string): Promise<RoomReview[]> {
        return MongoRoomReview.find({roomOfferId}).then();
    }

    save(roomReview: RoomReview): Promise<RoomReview> {
        return new MongoRoomReview({
            ...roomReview
        }).save()
    }

}

type MongoRoomReview = RoomReview & mongoose.Document


const roomReviewSchema = new mongoose.Schema({
    _id: String,
    userId: {
        type: String,
        required: true
    },
    roomOfferId: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: false
    }
}).index({ userId: 1, roomOfferId: 1}, { unique: true });

const MongoRoomReview = mongoose.model<MongoRoomReview>('RoomReview', roomReviewSchema);


