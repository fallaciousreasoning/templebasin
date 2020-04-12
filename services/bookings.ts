import moment, { Moment } from 'moment';
import { BookingInfo } from "../model/bookingInfo";
import { database } from "./firebase";
import { assignRoom } from "./room";

export const bookingsPath = '/bookings';

const cleanBooking = (booking: BookingInfo) => {
    for (const guest of booking.guests)
        guest.dietaryRequirements = guest.dietaryRequirements || [];
    return booking;
}

export const getBookings = async () => {
    const bookings = await database.ref(bookingsPath)
        .orderByChild('startDate')
        .once('value')
        .then(snapshot => snapshot.val());

    if (!bookings)
        return [];
    return Object.values(bookings).map(cleanBooking);
}

export const getBookingsInRange = async (minDate: Moment, maxDate: Moment) => {
    const bookings = await getBookings();

    return bookings.filter(b => {
        const start = moment(b.startDate);
        const end = moment(start).add(b.duration, 'days');
        const endsBefore = end.isBefore(minDate);
        const startsAfter = start.isAfter(maxDate);
        return !endsBefore && !startsAfter;
    });
}

export const getBookingsOnDay = async (day: Moment) => getBookingsInRange(moment(day).startOf('day'), moment(day).endOf('day'));

export const getBooking = async (bookingId: string): Promise<BookingInfo> => {
    const value: BookingInfo = await database.ref(`${bookingsPath}/${bookingId}`)
        .once('value')
        .then(snapshot => snapshot.val());

    if (!value)
        return null;

    return cleanBooking(value);
}

export const updateBooking = async (booking: BookingInfo) => {
    if (!booking.id) {
        const assignment = await assignRoom(booking);
        booking.lodge = assignment.lodge;
        booking.startRoom = assignment.startRoom;
    }

    const id = booking.id || (await database.ref(bookingsPath).push()).key;
    booking.id = id;

    await database.ref(`${bookingsPath}/${id}`).set(booking);

    return id;
}