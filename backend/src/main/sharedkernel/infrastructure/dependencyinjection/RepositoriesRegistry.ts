import {DatabaseMode, databaseModeFrom} from "../DatabaseMode";
import {newDatabase} from "../inmemorymongodb/InMemoryMongoDb";
import mongoose from "mongoose";
import {InMemoryUserProfileRepository} from "../../../userprofile/infrastructure/inmemory/InMemoryUserProfileRepository";
import {MongoUserProfileRepository} from "../../../userprofile/infrastructure/mongodb/MongoUserProfileRepository";
import {InMemoryUserCredentialsRepository} from '../../../authentication/infrastructure/inmemory/InMemoryUserCredentialsRepository';
import {MongoUserCredentialsRepository} from '../../../authentication/infrastructure/mongodb/MongoCredentialsRepository';
import {UserProfileRepository} from "../../../userprofile/domain/UserProfileRepository";
import {InMemoryRoomOfferRepository} from "../../../roomoffers/infrastructure/InMemoryRoomOfferRepository";
import {MongoRoomOfferRepository} from "../../../roomoffers/infrastructure/MongoRoomOfferRepository";
import {RoomOfferRepository} from "../../../roomoffers/RoomOfferRepository";
import {UserCredentialsRepository} from "../../../authentication/domain/UserCredentialsRepository";
import config from "config";
import {MongoRoomReservationRepository} from "../../../roomreservation/infrastructure/mongodb/MongoRoomReservationRepository";
import {RoomReservationRepository} from "../../../roomreservation/domain/RoomReservationRepository";
import {PhotoRepository} from "../../../photos/domain/PhotoRepository";
import {MongoPhotoRepository} from "../../../photos/infrastructure/MongoPhotoRepository";
import {RoomReviewRepository} from "../../../roomreview/RoomReviewRepository";
import {MongoRoomReviewRepository} from "../../../roomreview/infrastructure/MongoRoomReviewRepository";
import {InMemoryRoomReservationRepository} from "../../../roomreservation/infrastructure/inmemory/InMemoryRoomReservationRepository";


export class RepositoriesRegistry {
    constructor(private mode: DatabaseMode) {
    }

    static instance() {
        return this.forMode(databaseModeFrom(config.get<string>("database.mode")));
    }

    static instanceFor(mode: DatabaseMode) {
        return this.forMode(mode);
    }


    private static forMode(mode: DatabaseMode) {
        return new RepositoriesRegistry(mode);
    }

    async initializeDb(): Promise<RepositoriesRegistry> {
        switch (this.mode) {
            case DatabaseMode.EXTERNAL_MONGODB: {
                const connectionString = config.get<string>("database.external_mongo.uri");
                return mongoose.connect(connectionString)
                    .then(() => console.log(`External MongoDb connected on: ${connectionString}`))
                    .then(() => this);
            }
            case DatabaseMode.IN_MEMORY_LISTS: {
                console.log(`In memory repositories based on lists initialized`);
                return Promise.resolve(this);
            }
            case DatabaseMode.EMBEDDED_MONGODB: {
                return newDatabase()
                    .then(connectionString => {
                        mongoose.connect(connectionString)
                            .then(() => console.log(`Embedded MongoDb connected on: ${connectionString}`));
                    })
                    .then(() => this);
            }
        }
    }

    /**
     * EXPLANATION
     * Zależnie od konfiguracji używamy implementacji w pamięci na listach
     * lub połączenia z MongoDb
     */
    get userProfile(): UserProfileRepository {
        return this.mode === DatabaseMode.IN_MEMORY_LISTS
            ? new InMemoryUserProfileRepository()
            : new MongoUserProfileRepository()
    }

    get userCredentials(): UserCredentialsRepository {
        return this.mode === DatabaseMode.IN_MEMORY_LISTS
            ? new InMemoryUserCredentialsRepository()
            : new MongoUserCredentialsRepository()
    }

    get photos(): PhotoRepository {
        if (this.mode === DatabaseMode.IN_MEMORY_LISTS) {
            throw new Error('Not supported mode!')
        }
        return new MongoPhotoRepository()
    }

    get roomOfferReviews(): RoomReviewRepository {
        if (this.mode === DatabaseMode.IN_MEMORY_LISTS) {
            throw new Error('Not supported mode!')
        }
        return new MongoRoomReviewRepository()
    }

    get roomOffer(): RoomOfferRepository {
        return this.mode === DatabaseMode.IN_MEMORY_LISTS
            ? new InMemoryRoomOfferRepository()
            : new MongoRoomOfferRepository()
    }

    get roomReservation(): RoomReservationRepository {
        return this.mode === DatabaseMode.IN_MEMORY_LISTS
            ? new InMemoryRoomReservationRepository()
            : new MongoRoomReservationRepository()
    }
}
