import { database } from "./firebase";
import { PriceInfo, Prices } from "../model/priceInfo";

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