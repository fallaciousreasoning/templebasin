import { ServerResponse } from "http";

export const notFound = (res: ServerResponse) => {
    res.statusCode = 404;
    res.end();
}

export const error = (errors: string[], res: ServerResponse) => {
    const result = {
        errors
    };
    console.error('Bad request!', result)

    res.statusCode = 400;
    jsonResponse(result, res);
}

export const textResponse = (data: string, serverResponse: ServerResponse) => {
    serverResponse.setHeader('Content-Type', 'text/plain');
    serverResponse.end(data);
}

export const jsonResponse = <T>(data: T, serverResponse: ServerResponse) => {
    serverResponse.setHeader('Content-Type', 'application/json');
    serverResponse.end(JSON.stringify(data))
}