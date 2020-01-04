import * as express from 'express';
import RestApiException from "../exception/RestApiException";
import * as uuid from "uuid";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { currentUserMiddleware } from "../middleware/CurrentUserMiddleware";
import { ErrorCode } from "../../sharedkernel/domain/ErrorCode";
import { isDefined, isNotDefined } from "../../utils";
import { RoomReservationService } from '../../roomreservation/application/RoomReservationService';
import RoomReservationRequestBody from '../request/RoomReservationRequestBody';
import UpdateRoomReservationRequestBody from '../request/UpdateRoomReservationRequestBody';
import AcceptRoomReservationRequestBody from '../request/AcceptRoomReservationRequestBody'
import { RoomOfferRepository } from "../../roomoffers/RoomOfferRepository";

export default (roomReservationService: RoomReservationService, roomOfferRepository: RoomOfferRepository) => {
    const router: express.Router = express.Router();
    router.get('/guest-reservations', currentUserMiddleware, async (req, res, next) => {
        const userId = req.body.currentUser.id;
        if (isNotDefined(userId)) {
            next(new RestApiException(400, `Bad request!`, ErrorCode.BAD_REQUEST))
        }
        const foundReservations = await roomReservationService.findRoomReservationByUserId(userId);
        res.send(foundReservations)
    });
    router.get('/host-reservations', currentUserMiddleware, async (req, res, next) => {
        const user = req.body.currentUser.username;
        if (isNotDefined(user)) {
            next(new RestApiException(400, `Bad request!`, ErrorCode.BAD_REQUEST))
        }
        const foundReservations = await roomReservationService.findRoomReservationByOwner(user);
        res.send(foundReservations)
    });

    router.get('/guest-reservations/:id', currentUserMiddleware, async (req, res, next) => {
        const userId = req.body.currentUser.id;
        const reservationId = req.params.id;
        const foundReservation = await roomReservationService.findRoomReservationById(reservationId);
        if (foundReservation && userId === foundReservation.userId) {
            if (isDefined(foundReservation)) {
                res.send(foundReservation);
            } else {
                next(new RestApiException(404, `Reservation for id: ${reservationId} not found!`, ErrorCode.RESERVATION_NOT_FOUND))
            }
        } else {
            next(new RestApiException(400, 'Not allowed to change status', ErrorCode.YOU_ARE_NOT_ALLOWED));
        }
    });

    router.get('/host-reservations/:id', currentUserMiddleware, async (req, res, next) => {
        const reservationId = req.params.id;
        const foundReservation = await roomReservationService.findRoomReservationById(reservationId);
        if(!foundReservation){
            next(new RestApiException(404, `Reservation for id: ${reservationId} not found!`, ErrorCode.RESERVATION_NOT_FOUND));
        }
        const hostname = foundReservation!.owner;
        const username = req.body.currentUser.username;
        if (hostname === username) {
            if (isDefined(foundReservation)) {
                res.send(foundReservation);
            } else {
                next(new RestApiException(404, `Reservation for id: ${reservationId} not found!`, ErrorCode.RESERVATION_NOT_FOUND));
            }
        } else {
            next(new RestApiException(400, 'Not allowed to change status', ErrorCode.YOU_ARE_NOT_ALLOWED));
        }
    });

    router.post('/guest-reservations', currentUserMiddleware, validationMiddleware(RoomReservationRequestBody), async (req, res, next) => {
        const requestBody: RoomReservationRequestBody = req.body;
        const offer = await roomOfferRepository.findById(requestBody.offerId);
        if (isNotDefined(offer)) {
            next(new RestApiException(400, 'Offer not found', ErrorCode.OFFERS_NOT_FOUND))
        }
        const newReservationId = uuid.v4();
        const result = await roomReservationService.makeRoomReservation(
            {
                _id: newReservationId,
                offerId: requestBody.offerId,
                owner: offer!.username,
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


    router.patch('/:id/status', currentUserMiddleware, validationMiddleware(AcceptRoomReservationRequestBody), async (req, res, next) => {
        const requestBody: AcceptRoomReservationRequestBody = req.body;
        const id = req.params.id;
        const offer = await roomOfferRepository.findById(id);
        if(!offer){
            next(new RestApiException(400, 'Not allowed to change status', ErrorCode.YOU_ARE_NOT_ALLOWED));
        }
        const username = offer!.username;
        const reservation = await roomReservationService.findRoomReservationById(id);
        if (reservation && req.body.currentUser.username === username && reservation.status === 'PENDING') {
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
        } else {
            next(new RestApiException(400, 'Not allowed to change status', ErrorCode.YOU_ARE_NOT_ALLOWED))
        }
    });
    return router;
};
export const ROUTE_URL = '/room-reservation';
