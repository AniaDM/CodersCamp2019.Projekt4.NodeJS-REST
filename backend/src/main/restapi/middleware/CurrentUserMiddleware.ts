import { Response, NextFunction, Request } from 'express';
import { ErrorCode } from "../../sharedkernel/domain/ErrorCode";
import { ExpressServer } from '../ExpressServer';
import RestApiException from "../exception/RestApiException";


export async function currentUserMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (token) {
        try {
            const userId = ExpressServer.userCredentialsService.verificationToken(token)._id;
            const currentUser = await ExpressServer.userCredentialsService.findUserCredentialsById(userId);
            if (currentUser) {
                req.body.currentUser = currentUser;
                next();
            } else {
                next(new RestApiException(400, 'Invalid token!', ErrorCode.WRONG_AUTHENTICATION_TOKEN_EXCEPTION));
            }
        } catch{
            next(new RestApiException(400, 'Invalid token!', ErrorCode.WRONG_AUTHENTICATION_TOKEN_EXCEPTION));
        }
    } else {
        next(new RestApiException(500, 'No token', ErrorCode.VALIDATION_ERROR));
    }
} 