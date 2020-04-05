import { Moment } from "moment";
import { getBookingsInRange, notCheckingOutOn, getNumGuests } from "./bookings";
import { getLodges } from "./lodges";

export const getOccupancyInfo = async (from: Moment, to: Moment) => {
    const notCheckingOut = notCheckingOutOn(to);

    const bookings = await (await getBookingsInRange(from, to)).filter(notCheckingOut);
    const lodges = await getLodges();

    const aggregated: {
        [key: string]: {
            id: string;
            name: string;
            occupancy: number;
            occupied: number;
        }
    } = {};
        
    for (const lodge of lodges)
    aggregated[lodge.id] = { id: lodge.id, occupancy: lodge.occupancy, occupied: 0, name: lodge.name };

    for (const booking of bookings) {
        aggregated[booking.lodge].occupied += getNumGuests(booking);
    }

    const resultArray = Object.values(aggregated);
    const total = {
        id: 'total',
        name: 'Total',
        occupancy: lodges.map(l => l.occupancy).reduce((prev, next) => prev + next, 0),
        occupied: resultArray.map(l => l.occupied).reduce((prev, next) => prev + next, 0)
    };
    resultArray.push(total);

    return resultArray;
}