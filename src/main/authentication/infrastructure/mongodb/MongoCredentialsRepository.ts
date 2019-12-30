import {UserCredentialsRepository} from "../../domain/UserCredentialsRepository";
import {UserCredentials} from "../../domain/UserCredentials";
import * as mongoose from "mongoose";

export class MongoUserCredentialsRepository implements UserCredentialsRepository {

    findById(id: string): Promise<UserCredentials | null> {
        return MongoUserCredentials.findById(id).then()
    }

    save(userCredentials: UserCredentials): Promise<UserCredentials> {
        const {_id, username, password} = userCredentials;
        return new MongoUserCredentials({
            _id: _id,
            username,
            password
        }).save()
    }
    async findByUsername(username: string): Promise<UserCredentials | null> {
        return MongoUserCredentials.findOne({username: username}).then()
    }

}

type MongoUserCredentials = UserCredentials & mongoose.Document

const userCredentialsSchema = new mongoose.Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 64,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: false
    }

});

const MongoUserCredentials = mongoose.model<MongoUserCredentials>('UserCredentials', userCredentialsSchema); 