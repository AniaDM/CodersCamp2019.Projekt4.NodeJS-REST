import {RoomSearcher} from "../../roomsearch/RoomSearcher";
import {isDefined, isNotDefined} from "../../utils";
import RestApiException from "../exception/RestApiException";
import {ErrorCode} from "../../sharedkernel/domain/ErrorCode";


export default (roomSearcher: RoomSearcher) => {
    const router: express.Router = express.Router();

    router.get('/:offers', async (req, res) => {
        const filter = req.query.filter;
        const offers = await RoomSearcher.searchOffersBy(filter);
        if (isDefined(offers)) {
            res.send(offers)
        } else {
            next(new RestApiException(404, `Offers for this filter not found!`, ErrorCode.OFFERS_NOT_FOUND))
        }
    })
}

export const ROUTE_URL = '/offers';