import { Guest } from "./guest";

export interface BookingInfo {
    duration: number;
    startDate: string;

    owner: Guest;
    numGuests: number;
}