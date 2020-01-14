import {Response, NextFunction, Request} from 'express';
import {ErrorCode} from "../../sharedkernel/domain/ErrorCode";
import RestApiException from "../exception/RestApiException";
import config from "config";
import {DevMode} from "../../devmode/DevMode";


export function currentUserMiddleware(userCredentialsService) {
    const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('x-auth-token');
        if (token) {
            try {
                const userId = userCredentialsService.verificationToken(token)._id;
                const currentUser = await userCredentialsService.findUserCredentialsById(userId);
                if (currentUser) {
                    req.body.currentUser = currentUser;
                    next();
                } else {
                    next(new RestApiException(400, 'Invalid token!', ErrorCode.WRONG_AUTHENTICATION_TOKEN_EXCEPTION));
                }
            } catch {
                next(new RestApiException(400, 'Invalid token!', ErrorCode.WRONG_AUTHENTICATION_TOKEN_EXCEPTION));
            }
        } else {
            next(new RestApiException(500, 'No token', ErrorCode.VALIDATION_ERROR));
        }
    };
    const devModeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        req.body.currentUser = await userCredentialsService.findUserCredentialsById(DevMode.CurrentUser.id)
    };
    return config.get<boolean>("devMode") ? devModeMiddleware : jwtMiddleware;
}