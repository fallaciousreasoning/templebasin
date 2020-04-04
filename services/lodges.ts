import { database } from "./firebase"
import { Lodge } from "../model/lodge";

export const lodgesPath = '/lodges';

export const getLodges = async () => {
    const data = await database.ref(lodgesPath)
        .once('value')
        .then(snapshot => snapshot.val());
    return Object.values(data) as Lodge[];
}

export const updateLodge = async (lodge: Lodge) => {
    const id = lodge.id || (await database.ref(lodgesPath).push()).key;
    lodge.id = id;

    await database.ref(`${lodgesPath}/${id}`).set(lodge);

    return id;
}