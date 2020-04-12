import moment, { Moment } from "moment";
import * as yup from 'yup';
import useData from "../utils/useData";
import { Guest, guestSchema } from "./guest";

export interface BookingInfo {
    id?: string;

    duration: number;
    startDate: string;

    contactEmail: string;
    contactPhone: string;

    guests: Guest[];

    selfCatered: boolean;
    includeLiftTickets: boolean;

    preferredLodge?: string;
    lodge?: string;
    startRoom?: number;

    additionalComments?: string
};

export const bookingSchema = yup
    .object()
    .shape({
        id: yup.string(),

        duration: yup.number().integer()
            .positive("Must stay at least one day")
            .max(6).required(),

        startDate: yup.date().min(new Date(), "Booking must be in the future!").required().default(() => {
            return moment().add(1, 'day');
        }),

        contactEmail: yup.string().email("Invalid email address.").required("Please provide an email."),
        contactPhone: yup.string().required("Please provide a phone number"),

        guests: yup.array()
            .min(1, "At least one guest must be present.")
            .max(5, "At most five guests may be present")
            .of(guestSchema),

        selfCatered: yup.bool(),
        includeLiftTickets: yup.bool(),

        preferredLodge: yup.string(),
        lodge: yup.string(),
        startRoom: yup.number().integer(),

        additionalComments: yup.string()
    });

export const getOwnerName = (booking: BookingInfo) => {
    if (!booking.guests.length)
        return booking.contactEmail;

    return booking.guests[0].name;
}

export const daysInRange = (booking: BookingInfo, from: Moment, to: Moment) => {
    const start = moment.max(getCheckinDate(booking), from);
    const end = moment.min(getCheckoutDate(booking), to);

    const days = end.diff(start, 'days');
    return Math.max(0, days);
}

export const useBooking = (bookingId: string) => {
    return useData<BookingInfo>(`/api/bookings/${bookingId}`);
}

export const isOnDay = (booking: BookingInfo, day: Moment) => {
    return moment(booking.startDate).isSameOrBefore(day)
        && moment(booking.startDate).add(booking.duration, 'days').isSameOrAfter(day);
}

export const notCheckingOutOn = (day: Moment) => (booking: BookingInfo) => !getCheckoutDate(booking).isSame(day, 'day');

export const getNumGuests = (booking: Pick<BookingInfo, 'guests'>) => {
    return booking.guests.length;
}

export const getCheckinDate = (booking: BookingInfo) => {
    return moment(booking.startDate);
}

export const getCheckoutDate = (booking: BookingInfo) => {
    return getCheckinDate(booking).add(booking.duration, 'days');
}