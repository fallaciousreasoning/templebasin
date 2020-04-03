import { IncomingMessage } from "http";
import { ApiRequest } from "../model/apiRequest";

export const json = <T = {}>(req: ApiRequest) => {
    return JSON.parse(req.body) as T;
}