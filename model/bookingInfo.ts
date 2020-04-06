import { Guest, guestSchema } from "./guest";
import yup from 'yup';

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

        duration: yup.number().integer().min(1).max(7).required(),
        startDate: yup.date().min(new Date()).required(),

        owner: guestSchema.required(),
        additionalGuests: yup.number().integer().positive(),

        selfCatered: yup.bool(),
        includeLiftTickets: yup.bool(),

        lodge: yup.string(),
        startRoom: yup.number().integer(),
    });