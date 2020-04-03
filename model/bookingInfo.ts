import { Guest } from "./guest";

export interface BookingInfo {
    id?: string;
    
    duration: number;
    startDate: string;

    owner: Guest;
    numGuests: number;

    selfCatered: boolean;
    includeLiftTickets: boolean;
}