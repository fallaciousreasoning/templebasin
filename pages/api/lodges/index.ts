import { IncomingMessage, ServerResponse } from "http"
import { getLodges, updateLodge } from "../../../services/lodges";
import { jsonResponse } from "../../../utils/response";

const initializeLodges = async () => {
    for (const lodge of require('../../../data/lodgeData.json'))
        await updateLodge(lodge);

    return getLodges();
}

export default async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method !== "GET") {
        res.statusCode = 404;
        return;
    }

    const lodges = await getLodges() || await initializeLodges();

    res.statusCode = 200;
    jsonResponse(lodges, res);
}