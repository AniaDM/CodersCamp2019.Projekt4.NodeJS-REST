import{UserCredentials} from './UserCredentials';

export interface UserCredentialsRepository{
    save(userCredentials: UserCredentials): Promise<UserCredentials>
    findById(id: string): Promise<UserCredentials | null>
    findByUsername(username: string): Promise<UserCredentials | null>
}