import { database } from "./firebase";
import { PriceInfo, Prices, priceForStay } from "../model/priceInfo";
import { BookingInfo } from "../model/bookingInfo";

const defaultPrices = require('../data/priceData.json') as Prices;

export const pricesPath = '/prices';

export const getPrices = async () => {
    const data = await database.ref(pricesPath)
        .once('value')
        .then(snapshot => snapshot.val());

    if (!data)
        return updatePrices({})

    return data as Prices;
}

export const updatePrices = async (prices: Partial<Prices>) => {
    prices = {
        ...defaultPrices,
        ...prices
    };

    await database.ref(`${pricesPath}`).set(prices);
    return prices as Prices;
}

export const calculatePrice = async (booking: BookingInfo) => {
    const prices = await getPrices();
    let total = 0;

    for (const guest of booking.guests) {
        const guestCost = priceForStay(guest, booking, prices);
        total += guestCost;
    }

    return total;
}