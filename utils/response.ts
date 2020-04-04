import { ServerResponse } from "http";

export const jsonResponse = <T>(data: T, serverResponse: ServerResponse) => {
    serverResponse.setHeader('Content-Type', 'application/json');
    serverResponse.end(JSON.stringify(data))
}