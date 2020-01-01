import {CommandResult} from "../../sharedkernel/application/CommandResult";
import {UserProfileRepository} from "../domain/UserProfileRepository";
import {isDefined} from "../../utils";
import {UserProfile} from "../domain/UserProfile";
import {RegisterUserProfile} from "./RegisterUserProfile";
import {UpdateUserProfile} from "./UpdateUserProfile";
import {PhotoStorage} from "../../photos/application/PhotoStorage";

export class UserProfileService {

    constructor(private userProfileRepository: UserProfileRepository, private photoStorage: PhotoStorage) {
    }

    async registerUserProfile(command: RegisterUserProfile): Promise<CommandResult> {
        await this.checkIfPhotoExists(command.photoId);
        return this.userProfileRepository.save({...command})
            .then(() => CommandResult.success())
            .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
    }

    private async checkIfPhotoExists(photoId?: string) {
        if (photoId) {
            await this.photoStorage.retrieve(photoId)
        }
    }

    async updateUserProfile(command: UpdateUserProfile): Promise<CommandResult> {
        const foundUser = await this.userProfileRepository.findById(command._id);
        if (foundUser) {
            foundUser.email = command.email;
            foundUser.firstName = command.firstName;
            foundUser.lastName = command.lastName;
            foundUser.photoId = command.photoId;
            return this.userProfileRepository.update(foundUser)
                .then(() => CommandResult.success())
                .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
        } else {
            return Promise.reject(CommandResult.failureDueTo(`User with id: ${command._id} not found!`));
        }
    }

    findUserProfileByUsername(username: string): Promise<UserProfile | null> {
        return this.userProfileRepository.findByUsername(username);
    }

    findUserProfileById(id: string): Promise<UserProfile | null> {
        return this.userProfileRepository.findById(id);
    }

}
