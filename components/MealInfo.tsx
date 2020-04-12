import { Moment } from "moment";
import { BookingInfo, daysInRange, getCheckinDate, getCheckoutDate } from "../model/bookingInfo";

type MealInfo = { guests: number } & {
    [requirement: string]: number;
}

interface MealOverview {
    breakfasts: MealInfo;
    lunches: MealInfo;
    dinners: MealInfo;
}

export default (props: { bookings: BookingInfo[], from: Moment, to: Moment }) => {
    const overview: MealOverview = {
        breakfasts: {
            guests: 0
        },
        lunches: {
            guests: 0
        },
        dinners: {
            guests: 0
        }
    };

    for (const booking of props.bookings) {
        const daysStay = daysInRange(booking, props.from, props.to);
        const checksin = getCheckinDate(booking).isBetween(props.from, props.to, 'days', '[]');
        const checksout = getCheckoutDate(booking).isBetween(props.from, props.to, 'days', '[]');

        const guests = booking.guests.length;
        let breakfasts = (daysStay + 1) * guests;
        let lunches = breakfasts;
        let dinners = lunches;

        if (checksin) {
            breakfasts -= guests;
            lunches -= guests;
        }

        if (checksout) {
            lunches -= guests;
            dinners -= guests;
        }

        overview.breakfasts.guests += breakfasts;
        overview.lunches.guests += lunches;
        overview.dinners.guests += dinners;

        for (const guest of booking.guests) {
            // TODO: Work out dietary requirements.
        }
    }

    return <div>
        <div>
            <b>Breakfasts:</b> {overview.breakfasts.guests}
        </div>
        <div>
            <b>Lunches:</b> {overview.lunches.guests}
        </div>
        <div>
            <b>Dinners:</b> {overview.dinners.guests}
        </div>
    </div>;
}