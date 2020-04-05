import { ApiRequest } from "../../model/apiRequest";
import { ServerResponse } from "http";
import queryString from 'query-string';
import moment from "moment";
import { getBookingsOnDay, getCheckinDate, getCheckoutDate, getNumGuests } from "../../services/bookings";
import { jsonResponse } from "../../utils/response";
import { getLodges } from "../../services/lodges";
import { Lodge } from "../../model/lodge";
import { BedInfo } from "../../model/bedInfo";

// Request should look like this:
//    //   /beds?on=YYYY-MM-DD
export default async (req: ApiRequest, res: ServerResponse) => {
    const query = queryString.parseUrl(req.url).query;
    const on = moment(query.on);

    const lodges = await getLodges();
    const lodgeMap = lodges.reduce((prev, next) => ({ ...prev, [next.id]: next }), {} as { [id: string]: Lodge });

    // Bookings checking out on the day won't need any beds. 
    const bookings = (await getBookingsOnDay(on)).filter(b => !getCheckoutDate(b).isSame(on, 'day'));
    const bedInfos: BedInfo[] = bookings.map(b => ({
        owner: `${b.owner.firstName} ${b.owner.lastName}`,
        guests: getNumGuests(b),
        checkin: getCheckinDate(b).format('DD-MM-YYYY'),
        checkout: getCheckoutDate(b).format('DD-MM-YYYY'),
        lodge: lodgeMap[b.lodge].name,
        startRoom: b.startRoom,
        endRoom: b.startRoom + getNumGuests(b)
    }));

    jsonResponse(bedInfos, res);
}