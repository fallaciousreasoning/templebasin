import { Guest, guestSchema } from "./guest";
import * as yup from 'yup';
import moment from "moment";

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