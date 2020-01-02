import {PhotoRepository} from "../domain/PhotoRepository";
import {Photo} from "../domain/Photo";
import * as mongoose from "mongoose";

export class MongoPhotoRepository implements PhotoRepository {

    findById(id: string): Promise<Photo | null> {
        return MongoPhoto.findById(id).then();
    }

    save(photo: Photo): Promise<Photo> {
        const {_id, base64} = photo;
        return new MongoPhoto({_id, base64}).save();
    }

}

type MongoPhoto = Photo & mongoose.Document

const photoSchema = new mongoose.Schema({
    _id: String,
    base64: {
        type: String,
        required: true
    }
});

const MongoPhoto = mongoose.model<MongoPhoto>('Photo', photoSchema);
