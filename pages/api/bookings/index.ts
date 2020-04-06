import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import { getBookingsInRange, getBookings } from "../../../services/bookings";
import moment, { Moment } from "moment";
import queryString from 'query-string';
import { jsonResponse } from "../../../utils/response";
import { BookingInfo } from "../../../model/bookingInfo";

// request should be either of the form:
//   /bookings?from=YYYY-MM-DD&to=YYYY-MM-DD
// or
//   /bookings?on=YYYY-MM-DD
export default async (req: ApiRequest, res: ServerResponse) => {
    const query = queryString.parseUrl(req.url).query;

    let start: Moment;
    let end: Moment;

    const from = query.from || query.on;
    if (from) {
        start = moment(from).startOf('day');
    }
    if (query.to) {
        end = moment(query.to).endOf('day');
    }

    if (start && !end)
        end = moment(start).endOf('day');

    let bookings: BookingInfo[];
    if (start && end)
        bookings = await getBookingsInRange(start, end);
    else
        bookings = await getBookings();
        
    jsonResponse(bookings, res);
}