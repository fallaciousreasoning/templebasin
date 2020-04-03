import { database } from "./firebase"
import { BookingInfo } from "../model/bookingInfo";

const bookingsPath = '/bookings';

export const getBookings = async () => {
    return database.ref(bookingsPath)
        .once('value')
        .then(snapshot => snapshot.val());
}

export const getBooking = async (bookingId: string): Promise<BookingInfo> => {
    return database.ref(`${bookingsPath}/${bookingId}`)
        .once('value')
        .then(snapshot => snapshot.val()) as Promise<BookingInfo>;
}

export const updateBooking = async (booking: BookingInfo) => {
    if (!booking.id) {
        const result = await database.ref(bookingsPath).push(booking);
        booking.id = result.key;
    } else {
        await database.ref(`${bookingsPath}/${booking.id}`).set(booking);
    }

    return booking.id;
}