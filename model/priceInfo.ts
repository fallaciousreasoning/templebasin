import { BookingInfo } from "./bookingInfo";
import { Guest } from "./guest";

export interface Prices {
    liftPasses: PriceInfo;

    lunchOnly: PriceInfo;
    weekender: PriceInfo;

    dbb: PriceInfo;
    
    // Self catered.
    accomodationOnly: PriceInfo
    
    // Packages: 
    // index is [numNights - 1];
    packages: [
        PriceInfo,
        PriceInfo,
        PriceInfo,
        PriceInfo,
        PriceInfo,
        PriceInfo,
        PriceInfo
    ];
}

export interface PriceInfoBase {
    default?: number;
    weekend?: number;
    clubMember?: number;
}

export interface PriceInfo extends PriceInfoBase {
    perDay?: boolean;

    adult?: PriceInfoBase | number;
    student?: PriceInfoBase | number;
    under18?: PriceInfoBase | number;
    under13?: PriceInfoBase | number;
}

const accomodationCategory: { [key: string]: 'adult' | 'student' | 'under18' | 'under13' & keyof PriceInfo } = {
    "Adult": "adult",
    "Student": "student",
    "Under 18": "under18",
    "Under 13": "under13",
};

export const determinePrice = (guest: Guest, price: PriceInfo) => {
    const category = accomodationCategory[guest.category];

    // Note for the rest of the function:
    // rate may be undefined.
    let rate = price.default;
    if (guest.clubMember && !isNaN(price.clubMember)) {
        rate = price.clubMember;
    }

    const specificPrice = price[category];
    if (specificPrice !== undefined) {
        if (typeof specificPrice === 'number') {
            rate = isNaN(rate)
                ? specificPrice
                : Math.min(specificPrice, rate);
        } else {
            let specificRate = specificPrice.default;
            if (guest.clubMember && !isNaN(specificPrice.clubMember))
                specificRate = specificPrice.clubMember;

            if (isNaN(rate))
                rate = specificRate;
            // We have to take the min of the rate because
            // the specific rate could be higher:
            // (e.g. clubMember price specified at root, not on specific).
            else rate = Math.min(rate, specificRate);
        }
    }

    if (rate === undefined)
        throw new Error("Unable to determine price!");

    return rate;
}

export const priceForStay = (guest: Guest, booking: BookingInfo, prices: Prices) => {
    const { selfCatered, duration, includeLiftTickets } = booking;
    let total = 0;
    const addPriceForDays = (days: number, scheme: PriceInfo) =>
        total += (scheme.perDay ? days : 1) * determinePrice(guest, scheme);

    if (includeLiftTickets) {
        const packageIndex = duration - 1;
        if (packageIndex >= prices.packages.length)
            throw new Error(`No package covering ${duration} days!`);
        addPriceForDays(duration, prices.packages[packageIndex]);
    }
    else if (selfCatered) {
        addPriceForDays(duration, prices.accomodationOnly);
    } else {
        addPriceForDays(duration, prices.dbb);
    }

    return total;
}