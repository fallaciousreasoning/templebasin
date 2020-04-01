import { database } from "./firebase"
import { BookingInfo } from "../model/bookingInfo";

const bookingsPath = '/bookings';

export const getBookings = async () => {
    return database.ref(bookingsPath)
        .once('value')
        .then(snapshot => snapshot.val());
}

export const addBooking = async (booking: BookingInfo) => {
    return database.ref(bookingsPath).push(booking);
}