import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import { getBookingsInRange, getBookings } from "../../../services/bookings";
import moment, { Moment } from "moment";
import queryString from 'query-string';
import { jsonResponse } from "../../../utils/response";

// request should be either of the form:
//   /bookings?from=YYYY-MM-DD&to=YYYY-MM-DD
// or
//   /bookings?on=YYYY-MM-DD
export default async (req: ApiRequest, res: ServerResponse) => {
    const query = queryString.parseUrl(req.url).query;

    let from = query.from || query.on;
    let to = query.to;

    let start: Moment = moment(from);
    let end: Moment = moment(to);

    if (!from) {
        res.end("Missing required param 'from'");
        res.statusCode = 400;
        return;
    }

    if (!to) {
        // From is required for from/to queries.
        if (query.from) {
            res.end("Missing required param 'to'");
            res.statusCode = 400;
            return;
        }

        start = moment(from).startOf('day');
        end = moment(from).endOf('day');
    }

    const bookings = await getBookingsInRange(start, end);
    jsonResponse(bookings, res);
}