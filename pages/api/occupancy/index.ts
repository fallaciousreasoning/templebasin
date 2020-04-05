import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import queryString from 'query-string';
import moment, { Moment } from "moment";
import { getBookingsInRange } from "../../../services/bookings";
import { getLodges } from "../../../services/lodges";
import { jsonResponse } from "../../../utils/response";
import { getOccupancyInfo } from "../../../services/occupancy";

// Supports querying a range with ?from=YYYY-MM-DD&to=YYYY-MM-DD
// and a day with ?on=YYYY-MM-DD
export default async (req: ApiRequest, res: ServerResponse) => {
    const query = queryString.parseUrl(req.url).query;

    let from: Moment;
    let to: Moment;

    if (query.on) {
        from = moment(query.on).startOf('day');
        to = moment(query.on).endOf('day');
    } else {
        from = moment(query.from);
        to = moment(query.to);
    }

    jsonResponse(await getOccupancyInfo(from, to), res);
}