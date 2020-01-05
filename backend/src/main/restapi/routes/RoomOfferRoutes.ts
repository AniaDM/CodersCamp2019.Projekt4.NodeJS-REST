import * as express from 'express';
import RestApiException from '../exception/RestApiException';
import { ErrorCode } from '../../sharedkernel/domain/ErrorCode';
import { isDefined, isNotDefined } from '../../utils';
import { RoomOffersService } from '../../roomoffers/RoomOffersService';
import * as uuid from 'uuid';
import validationMiddleware from '../middleware/ValidationMiddleware';
import AddRoomOfferRequestBody from '../request/AddRoomOfferRequestBody';
import UpdateRoomOfferRequestBody from '../request/UpdateRoomOfferRequestBody';
import { currentUserMiddleware } from '../middleware/CurrentUserMiddleware';
import { UserCredentials } from '../../authentication/domain/UserCredentials';

export default (roomOffersService: RoomOffersService) => {
  const cors = require('cors');
  const router: express.Router = express.Router();

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  router.get('/', async (req, res, next) => {
    const username = req.query.username;

    if (isNotDefined(username)) {
      next(
        new RestApiException(
          400,
          `Query param username have to be defined!`,
          ErrorCode.BAD_REQUEST
        )
      );
    }

    const offers = await roomOffersService.findRoomOfferByUsername(username);
    res.send(offers);
  });

  router.post(
    '/',
    [validationMiddleware(AddRoomOfferRequestBody), currentUserMiddleware],
    async (req: any, res: any, next: any) => {
      const requestBody: AddRoomOfferRequestBody = req.body;
      const currentUser: UserCredentials = req.body.currentUser;
      const id = uuid.v4();
      const result = await roomOffersService.addOffer({
        _id: id,
        username: currentUser.username,
        isPublic: false,
        roomLocation: requestBody.roomLocation,
        dateCheckIn: requestBody.dateCheckIn ? new Date(requestBody.dateCheckIn) : undefined,
        dateCheckOut: requestBody.dateCheckOut ? new Date(requestBody.dateCheckOut) : undefined,
        price: requestBody.price,
        roomPhoto: requestBody.roomPhoto,
        paymentMethod: requestBody.paymentMethod,
        numberOfGuests: requestBody.numberOfGuests,
        numberOfBeds: requestBody.numberOfBeds,
        numberOfGuestsPerBeds: requestBody.numberOfGuestsPerBeds,
        additionalServices: requestBody.additionalServices,
        title: requestBody.title,
        description: requestBody.description
      });
      result.process(
        () => res.status(201).send({ id: id }),
        failure =>
          next(
            new RestApiException(
              400,
              failure.reason,
              ErrorCode.UNABLE_TO_SAVE_OFFER
            )
          )
      );
    }
  );

  router.put(
    '/:id',
    validationMiddleware(UpdateRoomOfferRequestBody),
    async (req, res, next) => {
      const id = req.params.id;
      const requestBody: UpdateRoomOfferRequestBody = req.body;
      const result = await roomOffersService.updateOffer({
        _id: id,
        roomLocation: requestBody.roomLocation,
        dateCheckIn: requestBody.dateCheckIn,
        dateCheckOut: requestBody.dateCheckOut,
        price: requestBody.price,
        roomPhoto: requestBody.roomPhoto,
        paymentMethod: requestBody.paymentMethod,
        numberOfGuests: requestBody.numberOfGuests,
        numberOfBeds: requestBody.numberOfBeds,
        numberOfGuestsPerBeds: requestBody.numberOfGuestsPerBeds,
        additionalServices: requestBody.additionalServices,
        title: requestBody.title,
        description: requestBody.description
      });
      result.process(
        () => res.status(200).end(),
        failure =>
          next(
            new RestApiException(
              404,
              failure.reason,
              ErrorCode.USER_PROFILE_NOT_FOUND
            )
          )
      );
    }
  );

  router.put('/:id/publication', async (req, res, next) => {
    const id = req.params.id;
    const isPublic = (req.params.isPublic as unknown) as boolean;
    const result = await roomOffersService.changeOfferPublication({
      _id: id,
      isPublic
    });
    result.process(
      () => res.status(200).end(),
      failure =>
        next(
          new RestApiException(
            404,
            failure.reason,
            ErrorCode.USER_PROFILE_NOT_FOUND
          )
        )
    );
  });

  return router;
};

export const ROUTE_URL = '/room-offers';
