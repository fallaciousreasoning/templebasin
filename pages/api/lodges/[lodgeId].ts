import { IncomingMessage, ServerResponse } from "http";
import { json } from "../../../utils/request";
import { Lodge } from "../../../model/lodge";
import { updateLodge } from "../../../services/lodges";
import { ApiRequest } from "../../../model/apiRequest";

export default async (req: ApiRequest<{ lodgeId: string }>, res: ServerResponse) => {
    if (req.method !== "PUT") {
        res.statusCode = 404;
        return;
    }

    const data = json<Lodge>(req);
    data.id = req.query.lodgeId;
    
    updateLodge(data);
}