import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import { getBookingsInRange, getBookings } from "../../../services/bookings";
import moment from "moment";
import queryString from 'query-string';

export default async (req: ApiRequest, res: ServerResponse) => {
    const query = queryString.parseUrl(req.url).query;
    console.log(query);
    const from = query.from;
    const to = query.to;

    if (!to) {
        res.end("Missing required param 'to'");
        res.statusCode = 400;
        return;
    }

    if (!from) {
        res.end("Missing required param 'from'");
        res.statusCode = 400;
        return;
    }

    const bookings = await getBookingsInRange(moment(from), moment(to));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(bookings));
}