import { ServerResponse } from "http";

export const notFound = (res: ServerResponse) => {
    res.statusCode = 404;
    res.end();
}

export const jsonResponse = <T>(data: T, serverResponse: ServerResponse) => {
    serverResponse.setHeader('Content-Type', 'application/json');
    serverResponse.end(JSON.stringify(data))
}