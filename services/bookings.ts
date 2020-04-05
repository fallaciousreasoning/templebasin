import { database } from "./firebase"
import { BookingInfo } from "../model/bookingInfo";
import { useState, useEffect } from "react";
import moment, { Moment } from 'moment';
import { assignRoom } from "./room";

export const bookingsPath = '/bookings';

export const getNumGuests = (booking: BookingInfo) => {
    return 1 + (isNaN(booking.additionalGuests) ? 0 : booking.additionalGuests);
}

export const getCheckinDate = (booking: BookingInfo) => {
    return moment(booking.startDate);
}

export const getCheckoutDate = (booking: BookingInfo) => {
    return getCheckinDate(booking).add(booking.duration, 'days');
}

export const getBookings = async () => {
    const bookings = await database.ref(bookingsPath)
        .orderByChild('startDate')
        .once('value')
        .then(snapshot => snapshot.val());

    if (!bookings)
        return [];
    return Object.values(bookings) as BookingInfo[];
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

export const notCheckingOutOn = (day: Moment) => (booking: BookingInfo) => !getCheckoutDate(booking).isSame(day, 'day');

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
    if (!booking.id) {
        await assignRoom(booking);
    }

    const id = booking.id || (await database.ref(bookingsPath).push()).key;
    booking.id = id;

    await database.ref(`${bookingsPath}/${id}`).set(booking);

    return id;
}