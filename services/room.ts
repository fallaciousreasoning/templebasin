import { BookingInfo } from "../model/bookingInfo";
import { getLodges } from "./lodges";
import moment from "moment";
import { getBookingsInRange, getNumGuests } from "./bookings";
import { Lodge } from "../model/lodge";

const getStartRoom = (lodge: Lodge, booking: BookingInfo, bookings: BookingInfo[]): number => {
    const numGuests = getNumGuests(booking);
    const maxRoom = lodge.occupancy;

    let startRoom = 0;
    for (let i = 0; i < bookings.length; ++i) {
        const b = bookings[i];
        const diff = b.startRoom - startRoom;

        if (diff < numGuests) {
            startRoom = b.startRoom + getNumGuests(b);
            continue;
        }

        break;
    }

    if (startRoom + numGuests <= maxRoom)
        return startRoom;

    return -1;
}

export const assignRoom = async (booking: BookingInfo) => {
    const start = moment(booking.startDate);
    const end = moment(booking.startDate).add(booking.duration, 'days');
    
    const lodges = await getLodges();
    const bookings = await getBookingsInRange(start, end);

    // Sort by whether the lodge preference for students matches whether the owner is a student,
    // then by the fill order of the lodge.
    const preferences = lodges.sort((first, second) => {
        if (first.preferStudents !== second.preferStudents) {
            return first.preferStudents !== booking.owner.student
                ? -1 : 1;
        }

        return second.fillOrder - first.fillOrder;
    });

    for (const lodge of preferences) {
        const lodgeBookings = bookings.filter(b => b.lodge === lodge.id);
        lodgeBookings.sort((b1, b2) => b2.startRoom - b1.startRoom);

        const startRoom = getStartRoom(lodge, booking, lodgeBookings);
        if (startRoom === -1)
            continue;

        booking.lodge = lodge.id;
        booking.startRoom = startRoom;
    }

    if (!booking.lodge)
        throw new Error(`Unable to fit ${getNumGuests(booking)}`);
}