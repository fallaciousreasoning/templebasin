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

export const makeBooking = async (booking: BookingInfo) => {
    return database.ref(bookingsPath).push(booking);
}