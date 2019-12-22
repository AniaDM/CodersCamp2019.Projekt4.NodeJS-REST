import { CreateUserCredentials } from "./CreateUserCredentials";
import { CommandResult } from "../../sharedkernel/application/CommandResult";
import { UserCredentialsRepository } from '../domain/UserCredentialsRepository';
import { isDefined } from "../../utils";
import { UserCredentials } from '../domain/UserCredentials';
import { DataStoredInToken } from '../infrastructure/DataStoredInToken';
import config from 'config';
import jwt from 'jsonwebtoken';



export class UserCredentialsService {

    constructor(private userCredentialsRepository: UserCredentialsRepository) { };


    createCredentials(command: CreateUserCredentials): Promise<CommandResult> {
        return this.userCredentialsRepository.save({ ...command })
            .then(() => CommandResult.success())
            .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
    }
    findUserCredentialsById(id: string): Promise<UserCredentials | null> {
        return this.userCredentialsRepository.findById(id);
    }
    findUserCredentialsByUsername(username: string): Promise<UserCredentials | null> {
        return this.userCredentialsRepository.findByUsername(username);
    }
    createToken(user: UserCredentials): string {
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
        };
        return jwt.sign(dataStoredInToken, config.get('authentication.jsonWebToken.privateKey'));

    }
    verificationToken(token: string): DataStoredInToken {
        return jwt.verify(token, config.get('authentication.jsonWebToken.privateKey')) as DataStoredInToken;
    };


}