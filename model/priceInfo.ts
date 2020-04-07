import { BookingInfo } from "./bookingInfo";
import { Guest, AccomodationCategory } from "./guest";

export interface PriceInfoBase {
    default?: number;
    weekend?: number;
    clubMember?: number;
}

export interface PriceInfo extends PriceInfoBase {
    adult?: PriceInfoBase | number;
    student?: PriceInfoBase | number;
    under18?: PriceInfoBase | number;
    under13?: PriceInfoBase | number;
}

const accomodationCategory: { [key: string]: keyof PriceInfo} = {
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