import { database } from "./firebase"
import { BookingInfo } from "../model/bookingInfo";
import book from "../pages/bookings/book";

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
    const id = booking.id || (await database.ref(bookingsPath).push()).key;
    booking.id = id;
    
    await database.ref(`${bookingsPath}/${id}`).set(booking);

    return id;
}