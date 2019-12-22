import * as express from 'express';
import RestApiException from "../exception/RestApiException";
import UserCredentialsRequestBody from "../request/UserCredentialsRequestBody";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { ErrorCode } from "../../sharedkernel/domain/ErrorCode";
import { UserCredentialsService } from "../../authentication/application/UserCredentialsService";
import bcrypt from 'bcrypt';

export default (userCredentialsService: UserCredentialsService) => {
    const router: express.Router = express.Router();

    router.post('/login', validationMiddleware(UserCredentialsRequestBody), async (req, res, next) => {
        const requestBody: UserCredentialsRequestBody = req.body;
        const result = await userCredentialsService.findUserCredentialsByUsername(requestBody.username);
        if (result) {
            await bcrypt.compare(requestBody.password, result.password, (err, matched) => {
                if (matched) {
                    const tokenData = userCredentialsService.createToken(result);
                    res.setHeader('x-auth-token', tokenData);
                    res.send(result);
                } else {
                    next(new RestApiException(401, `Bad credentials!`, ErrorCode.WRONG_CREDENTIALS_EXCEPTION));
                }
                if (err) {
                    next(new RestApiException(401, `Bad credentials!`, ErrorCode.WRONG_CREDENTIALS_EXCEPTION));
                }
            });
        } else {
            next(new RestApiException(404, `User profile not found!`, ErrorCode.USER_PROFILE_NOT_FOUND));
        }
    })

    router.post('/logout', validationMiddleware(UserCredentialsRequestBody), async (req, res, next) => {
        res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        res.send(200)
    });

    return router
}
export const ROUTE_URL = '/user-auth';
