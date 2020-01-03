import express, { NextFunction, Request, Response } from 'express';
import RestApiException from "./exception/RestApiException";
import { RepositoriesRegistry } from "../sharedkernel/infrastructure/dependencyinjection/RepositoriesRegistry";
import config from "config";
import { UserProfileService } from "../userprofile/application/UserProfileService";
import { UserCredentialsService } from '../authentication/application/UserCredentialsService';
import * as UserProfileRoutes from "./routes/UserProfileRoutes";
import * as RoomSearchRoutes from "./routes/RoomSearchRoutes";
import * as UserCredentialsRoutes from '../restapi/routes/UserCredentialsRoute';
import * as RoomReservationRoutes from './routes/RoomReservationRoutes';
import {RoomSearcher} from "../roomsearch/RoomSearcher";
import {
    ConsoleLogEmailSender,
    EmailMode,
    emailModeFrom,
    EmailSender,
    GmailEmailSender
} from "../emailmessage/EmailSender";
import { RoomReservationService } from '../roomreservation/application/RoomReservationService';
import { RoomOffersService } from '../roomoffers/RoomOffersService';

import {PhotoStorage} from "../photos/application/PhotoStorage";

import * as RoomOfferRoutes from './routes/RoomOfferRoutes';
import * as RoomReviewRoutes from "./routes/RoomReviewRoutes";
import {RoomReviewService} from "../roomreview/RoomReviewService";
import {RoomOfferRepository} from "../roomoffers/RoomOfferRepository";

export namespace ExpressServer {

    const repositoriesRegistry = RepositoriesRegistry.init();
    const roomOfferRepository : RoomOfferRepository = repositoriesRegistry.roomOffer;
    const photoStorage = new PhotoStorage(repositoriesRegistry.photos);
    const userProfileService = new UserProfileService(repositoriesRegistry.userProfile, photoStorage);
    export const userCredentialsService = new UserCredentialsService(repositoriesRegistry.userCredentials);
    const roomReservationService = new RoomReservationService(repositoriesRegistry.roomReservation);
    const roomSearcher = new RoomSearcher(repositoriesRegistry.roomOffer);
    const emailMode: EmailMode = emailModeFrom(config.get<string>("emailsender.mode"));
    const emailSender: EmailSender = emailMode === EmailMode.GMAIL ? new GmailEmailSender() : new ConsoleLogEmailSender();
    export const roomOffersService = new RoomOffersService(roomOfferRepository);
    const roomReviewService = new RoomReviewService(repositoriesRegistry.roomOfferReviews);

    const routes: { endpoint: string, router: express.Router }[] = [
        {
            endpoint: UserProfileRoutes.ROUTE_URL,
            router: UserProfileRoutes.default(userProfileService)
        },
        {
            endpoint: RoomOfferRoutes.ROUTE_URL,
            router: RoomOfferRoutes.default(roomOffersService)
        },
        {
            endpoint: UserCredentialsRoutes.ROUTE_URL,
            router: UserCredentialsRoutes.default(userCredentialsService)
        },
        {
            endpoint: RoomSearchRoutes.ROUTE_URL,
            router: RoomSearchRoutes.default(roomSearcher)
        },
        {
            endpoint: RoomReviewRoutes.ROUTE_URL,
            router: RoomReviewRoutes.get(roomReviewService)
        },
        {
            endpoint: RoomReservationRoutes.ROUTE_URL,
            router: RoomReservationRoutes.default(roomReservationService, roomOfferRepository)
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

}
