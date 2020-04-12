import { ApiRequest } from "../../model/apiRequest";
import { ServerResponse } from "http";
import queryString from 'query-string';
import moment from "moment";
import { getBookingsOnDay } from "../../services/bookings";
import { jsonResponse } from "../../utils/response";
import { getLodges } from "../../services/lodges";
import { Lodge } from "../../model/lodge";
import { BedInfo } from "../../model/bedInfo";
import range from "../../utils/range";
import { notCheckingOutOn, getNumGuests, getCheckinDate, getCheckoutDate } from "../../model/bookingInfo";

// Request should look like this:
//    //   /beds?on=YYYY-MM-DD
export default async (req: ApiRequest, res: ServerResponse) => {
    const query = queryString.parseUrl(req.url).query;
    const on = moment(query.on);

    const lodges = await getLodges();
    const lodgeMap = lodges.reduce((prev, next) => ({ ...prev, [next.id]: next }), {} as { [id: string]: Lodge });

    // Bookings checking out on the day won't need any beds.
    const notCheckingOut = notCheckingOutOn(on);
    const bookings = (await getBookingsOnDay(on)).filter(notCheckingOut);
    const bedInfos: BedInfo[] = bookings.map(b => ({
        owner: b.guests[0].name,
        guests: getNumGuests(b),
        checkin: getCheckinDate(b).format('DD-MM-YYYY'),
        checkout: getCheckoutDate(b).format('DD-MM-YYYY'),
        lodge: lodgeMap[b.lodge].name,
        lodgeId: b.lodge,
        startRoom: b.startRoom + 1,
        endRoom: b.startRoom + getNumGuests(b),
        rooms: range(b.startRoom + 1, b.startRoom + getNumGuests(b) + 1).join(', ')
    }));

    jsonResponse(bedInfos, res);
}