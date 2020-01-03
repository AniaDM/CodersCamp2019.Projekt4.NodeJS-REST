import * as express from 'express';
import RestApiException from "../exception/RestApiException";
import { NextFunction } from "express";
import RegisterUserRequestBody from "../request/RegisterUserRequestBody";
import uuid from "uuid";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { currentUserMiddleware } from "../middleware/CurrentUserMiddleware";
import { ErrorCode } from "../../sharedkernel/domain/ErrorCode";
import { UserProfileService } from "../../userprofile/application/UserProfileService";
import { isDefined, isNotDefined } from "../../utils";
import UpdateUserProfileRequestBody from "../request/UpdateUserProfileRequestBody";
import * as bcrypt from 'bcrypt';
import { ExpressServer } from '../../restapi/ExpressServer';
import { RoomReservationService } from '../../roomreservation/application/RoomReservationService';
import  RoomReservationRequestBody  from '../request/RoomReservationRequestBody';
import  UpdateRoomReservationRequestBody  from '../request/UpdateRoomReservationRequestBody';
import { RoomReservationRepository } from '../../roomreservation/domain/RoomReservationRepository';
import { RoomOffersService } from '../../roomoffers/RoomOffersService';
import AcceptRoomReservationRequestBody from '../request/AcceptRoomReservationRequestBody'

export default (roomReservationService: RoomReservationService) => {
    const router: express.Router = express.Router();
    router.get('/my-reservations', currentUserMiddleware, async (req, res, next) => {
        const userId = req.body.currentUser.id;
        if (isNotDefined(userId)) {
            next(new RestApiException(400, `Bad request!`, ErrorCode.BAD_REQUEST))
        }
        const foundUser = await roomReservationService.findRoomReservationByUserId(userId);
        res.send(foundUser)
    });
    router.get('/my-offers', currentUserMiddleware, async (req, res, next) => {
        const user = req.body.currentUser.username;
        if (isNotDefined(user)) {
            next(new RestApiException(400, `Bad request!`, ErrorCode.BAD_REQUEST))
        }
        const foundUser = await roomReservationService.findRoomReservationByOwner(user);
        res.send(foundUser)
    });

    router.get('/:id', async (req, res, next) => {
        const id = req.params.id;
        const foundUser = await roomReservationService.findRoomReservationById(id);
        if (isDefined(foundUser)) {
            res.send(foundUser);
        } else {
            next(new RestApiException(404, `Reservation for id: ${id} not found!`, ErrorCode.USER_PROFILE_NOT_FOUND))
        }
    });

    router.post('/', currentUserMiddleware, validationMiddleware(RoomReservationRequestBody), async (req, res, next) => {
        const requestBody: RoomReservationRequestBody = req.body;
        const offers = await roomReservationService.findRoomReservationByOfferId(requestBody.offerId);
        const dateCheckIn = new Date(requestBody.dateCheckIn);
        const dateCheckOut = new Date(requestBody.dateCheckOut);
        const alreadyExists = offers.find(it => {it.status==="approved"&&
            dateCheckIn <= new Date(it.dateCheckIn) && dateCheckOut > new Date(it.dateCheckIn)||
            dateCheckIn > new Date(it.dateCheckIn) && dateCheckIn < new Date(it.dateCheckOut);
        })
        if(alreadyExists){
            next(new RestApiException(409, 'Room is already booked!', ErrorCode.ROOM_IS_BOOKED))
        }
        const offer = await ExpressServer.roomOffersService.findById(requestBody.offerId);
        const newReservationId = uuid.v4();
        const result = await roomReservationService.addRoomReservation(
                {
                    _id: newReservationId,
                    offerId: requestBody.offerId,
                    owner: offer.username,
                    userId: req.body.currentUser.id,
                    dateCheckIn: requestBody.dateCheckIn,
                    dateCheckOut: requestBody.dateCheckOut,
                    paymentMethod: requestBody.paymentMethod,
                    status: requestBody.status,
                    numberOfGuests: requestBody.numberOfGeusts,
                    notice: requestBody.notice
                }
            );
            result.process(
                () => res.status(201).send({ id: newReservationId }),
                failure => next(new RestApiException(400, failure.reason, ErrorCode.BAD_REQUEST))
            );
        }
        
    );

    router.put('/:id', validationMiddleware(UpdateRoomReservationRequestBody), async (req, res, next) => {
        const requestBody: UpdateRoomReservationRequestBody = req.body;
        const id = req.params.id;
        const result = await roomReservationService.updateRoomReservation(
            {
                _id: id,
                dateCheckIn: requestBody.dateCheckIn,
                dateCheckOut: requestBody.dateCheckOut,
                status: requestBody.status,
                numberOfGuests: requestBody.numberOfGeusts,
                notice: requestBody.notice
            }
        );
        result.process(
            () => res.status(200).end(),
            failure => next(new RestApiException(404, failure.reason, ErrorCode.OFFERS_NOT_FOUND))
        );
    });
    router.put('/accept/:id', validationMiddleware(AcceptRoomReservationRequestBody), async (req, res, next) => {
        const requestBody: AcceptRoomReservationRequestBody = req.body;
        const id = req.params.id;
        const result = await roomReservationService.updateStatusRoomReservation(
            {
                _id: id,
                status: requestBody.status
            }
        );
        result.process(
            () => res.status(200).end(),
            failure => next(new RestApiException(404, failure.reason, ErrorCode.OFFERS_NOT_FOUND))
        );
    });
    return router;
};
export const ROUTE_URL = '/room-reservation';
