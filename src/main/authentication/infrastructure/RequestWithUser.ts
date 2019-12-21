import {Request} from 'express';
import {CreateUserCredentials} from '../application/CreateUserCredentials';

interface RequestWithUser extends Request{
    user: CreateUserCredentials;
}
export default RequestWithUser;