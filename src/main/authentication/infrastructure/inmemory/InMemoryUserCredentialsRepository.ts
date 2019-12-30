import {UserCredentialsRepository} from "../../domain/UserCredentialsRepository";
import {UserCredentials} from "../../domain/UserCredentials";
import {isDefined} from "../../../utils";
import * as _ from 'lodash';


export class InMemoryUserCredentialsRepository implements UserCredentialsRepository {
    private repository: UserCredentials[] = [];

    findById(id: string): Promise<UserCredentials| null> {
        const found = this.repository.find(it => it._id === id);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.resolve(null);
    }

    save(userCredentials: UserCredentials): Promise<UserCredentials> {
            this.repository.push(userCredentials);
            return Promise.resolve(userCredentials);

    }
    findByUsername(username: string): Promise<UserCredentials | null> {
        const found = this.repository.find(it => it.username === username);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.resolve(null);
    }

} 