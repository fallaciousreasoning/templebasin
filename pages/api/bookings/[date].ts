import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import { getBookingsInRange, isOnDay, getBookings } from "../../../services/bookings";
import moment from "moment";
import { DayInfo } from "../../../model/dayInfo";

export default async (req: ApiRequest<{ date: string }>, res: ServerResponse) => {
    if (req.method !== 'GET') {
        res.statusCode = 404;
        return;
    }

    const date = new Date(req.query.date);
    const minDate = moment(date).startOf('month');
    const maxDate = moment(date).endOf('month');
    const bookings = await getBookings();
    const duration = moment(date).daysInMonth();

    const dayInfos: DayInfo[] = [];
    for (let i = 0; i < duration; ++i) {
        const day = moment(minDate).add(i, 'days');
        const dayInfo: DayInfo = {
            title: '',

            breakfasts: 0,
            lunches: 0,
            dinners: 0,

            roomsUsed: 0,

            checkins: 0,
            checkouts: 0,

            day: day.startOf('day').toJSON(),
        }

        for (const booking of bookings) {
            if (!isOnDay(booking, day))
              continue;

            let guests = 1;
            if (!isNaN(booking.additionalGuests))
                guests += booking.additionalGuests;

            dayInfo.roomsUsed += guests;
            
            if (!booking.selfCatered) {
                if (!day.isSame(booking.startDate, 'day')) {
                    // No breakfast on start day.
                    dayInfo.breakfasts++;
                    dayInfo.checkins++;
                }
                dayInfo.lunches++;

                if (!day.isSame(moment(booking.startDate).add(booking.duration, 'days'))) {
                    // No dinner on last day.
                    dayInfo.dinners++;
                    dayInfo.checkouts++;
                }
            }
        }

        dayInfo.title = `${dayInfo.roomsUsed} rooms occupied`
        dayInfos.push(dayInfo);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dayInfos));
}