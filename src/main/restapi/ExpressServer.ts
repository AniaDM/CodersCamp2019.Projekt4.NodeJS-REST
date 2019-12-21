import express, {NextFunction, Request, Response} from 'express';
import RestApiException from "./exception/RestApiException";
import {RepositoriesRegistry} from "../sharedkernel/infrastructure/dependencyinjection/RepositoriesRegistry";
import config from "config";
import {UserProfileService} from "../userprofile/application/UserProfileService";
import {UserCredentialsService} from '../authentication/application/UserCredentialsService';
import * as UserProfileRoutes from "./routes/UserProfileRoutes";
import * as UserCredentialsRoutes from '../restapi/routes/UserCredentialsRoute';
import RequestWithUser from '../authentication/infrastructure/RequestWithUser';
import { ErrorCode } from "../sharedkernel/domain/ErrorCode";

export namespace ExpressServer {

    const repositoriesRegistry = RepositoriesRegistry.init();
    const userProfileService = new UserProfileService(repositoriesRegistry.userProfile);
    const userCredentialsService = new UserCredentialsService(repositoriesRegistry.userCredentials);

    const routes: { endpoint: string, router: express.Router }[] = [
        {
            endpoint: UserProfileRoutes.ROUTE_URL,
            router: UserProfileRoutes.default(userProfileService,userCredentialsService)
        },
        {
            endpoint: UserCredentialsRoutes.ROUTE_URL,
            router: UserCredentialsRoutes.default(userCredentialsService)
        }
    ];

    export function start(port: number = config.get<number>("express.server.port")) {
        const app = express();
        app.use(express.json());
        routes.forEach(it => app.use(`/api${it.endpoint}`, it.router));
        app.use(errorMiddleware);
        app.listen(port, () => console.log(`Express server listening on port ${port}`));
        return app;
    }

    const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
    const DEFAULT_ERROR_CODE = 500;

    function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
        if (error instanceof RestApiException) {
            const status = error.status || DEFAULT_ERROR_CODE;
            const message = error.message || DEFAULT_ERROR_MESSAGE;
            const code = error.errorCode;
            response
                .status(status)
                .send({
                    code,
                    message,
                })
        } else {
            const message = DEFAULT_ERROR_MESSAGE;
            response
                .status(DEFAULT_ERROR_CODE)
                .send({
                    message,
                })
        }
    }
    export async function currenUserMiddleware(req:RequestWithUser, res:Response, next:NextFunction) {
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

}
