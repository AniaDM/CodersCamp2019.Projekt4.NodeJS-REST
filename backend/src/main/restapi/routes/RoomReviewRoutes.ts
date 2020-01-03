import * as express from "express";
import {RoomReviewService} from "../../roomreview/RoomReviewService";
import {currentUserMiddleware} from "../middleware/CurrentUserMiddleware";
import validationMiddleware from "../middleware/ValidationMiddleware";
import AddRoomReviewRequestBody from "../request/AddRoomReviewRequestBody";
import {UserCredentials} from "../../authentication/domain/UserCredentials";
import RestApiException from "../exception/RestApiException";
import {ErrorCode} from "../../sharedkernel/domain/ErrorCode";

export const get = (roomReviewService: RoomReviewService) => {
    const router: express.Router = express.Router();

    router.post('', [validationMiddleware(AddRoomReviewRequestBody), currentUserMiddleware], async (req, res, next) => {
        const requestBody: AddRoomReviewRequestBody = req.body;
        const currentUser: UserCredentials = req.body.currentUser;
        const result = await roomReviewService.addReview({userId: currentUser._id, ...requestBody});
        result.process(
            () => {
                res.status(201).send()
            },
            failure => {
                next(new RestApiException(500, failure.reason, ErrorCode.UNKNOWN))
            }
        )
    });

    router.get('', async (req, res, next) => {
        const roomOfferId: string = req.query.roomOfferId;
        const result = await roomReviewService.findAllByRoomOfferId(roomOfferId);
        res.send(result);
    });

    return router;
};

export const ROUTE_URL = '/room-reviews';