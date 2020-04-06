import { Guest, guestSchema } from "./guest";
import * as yup from 'yup';
import moment from "moment";

export interface BookingInfo {
    id?: string;

    duration: number;
    startDate: string;

    owner: Guest;
    additionalGuests: number;

    selfCatered: boolean;
    includeLiftTickets: boolean;

    lodge?: string;
    startRoom?: number;
};

export const bookingSchema = yup
    .object()
    .shape({
        id: yup.string(),

        duration: yup.number().integer()
            .positive("Must stay at least one day")
            .max(7).required(),

        startDate: yup.date().min(new Date(), "Booking must be in the future!").required().default(() => {
            return moment().add(1, 'day');
        }),

        owner: guestSchema.required(),
        additionalGuests: yup.number().integer()
            .min(0)
            .max(4, "You can book for at most five people at one time."),

        selfCatered: yup.bool(),
        includeLiftTickets: yup.bool(),

        lodge: yup.string(),
        startRoom: yup.number().integer(),
    });