import { Guest } from "./guest";

export interface BookingInfo {
    id?: string;

    duration: number;
    startDate: string;

    owner: Guest;
    additionalGuests: number;

    selfCatered: boolean;
    includeLiftTickets: boolean;
}