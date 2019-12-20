import RestApiException from "../exception/RestApiException";
import { UserCredentialsService } from '../../authentication//application/UserCredentialsService';
import { ErrorCode } from "../../sharedkernel/domain/ErrorCode";

async function currenUserMiddleware(req, res, next) {
    userCredentialsService: UserCredentialsService;
    const cookies = req.cookies;
    if (cookies && cookies.Authorization) {
        try {
            const id = userCredentialsService.verificationToken(cookies.Authorization)._id;
            const user = await userCredentialsService.findUserCredentialsById(id);
            if (user) {
                req.user = user;
                next();
            } else {
                next(new RestApiException(400, 'Invalid token!', ErrorCode.WRONG_AUTHENTICATION_TOKEN_EXCEPTION));
            }
        } catch{
            next(new RestApiException(400, 'Invalid token!', ErrorCode.WRONG_AUTHENTICATION_TOKEN_EXCEPTION));
        }
    } else{
        next(new RestApiException(500, 'No token', ErrorCode.VALIDATION_ERROR));
    }   
} 