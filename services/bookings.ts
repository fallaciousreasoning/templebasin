import { database } from "./firebase"
import { BookingInfo } from "../model/bookingInfo";
import book from "../pages/bookings/book";
import { useState, useEffect } from "react";
import moment, { Moment } from 'moment';

export const bookingsPath = '/bookings';

export const getBookings = async () => {
    const bookings = await database.ref(bookingsPath)
        .orderByChild('startDate')
        .once('value')
        .then(snapshot => snapshot.val());
    return Object.values(bookings) as BookingInfo[];
}

export const getBookingsInRange = async (minDate: Moment, maxDate: Moment) => {
    const bookings = await getBookings();
    return bookings.filter(b => !moment(b.startDate).add(b.duration, 'days').isSameOrBefore(minDate)
                                && !moment(b.startDate).isSameOrAfter(maxDate));
}

export const isOnDay = (booking: BookingInfo, day: Moment) => {
    return moment(booking.startDate).isSameOrBefore(day)
        && moment(booking.startDate).add(booking.duration, 'days').isSameOrAfter(day);
}

export const getBooking = async (bookingId: string): Promise<BookingInfo> => {
    return database.ref(`${bookingsPath}/${bookingId}`)
        .once('value')
        .then(snapshot => snapshot.val()) as Promise<BookingInfo>;
}

export const useBooking = (bookingId: string) => {
    const [booking, setBooking] = useState<BookingInfo>(undefined);

    useEffect(() => {
        setBooking(undefined);
        getBooking(bookingId).then(booking => {
            if (!booking || booking.id !== bookingId)
              return;
            setBooking(booking);
        });
    }, [bookingId]);

    return booking;
}

export const updateBooking = async (booking: BookingInfo) => {
    const id = booking.id || (await database.ref(bookingsPath).push()).key;
    booking.id = id;

    await database.ref(`${bookingsPath}/${id}`).set(booking);

    return id;
}