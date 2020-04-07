import { ApiRequest } from "../model/apiRequest";
import { ServerResponse, IncomingHttpHeaders } from "http";
import { notFound, jsonResponse } from "./response";
import { json } from "./request";
import queryString from 'query-string';

interface RequestInfo<BodyType, QueryType, ParamsType> {
    body: BodyType;
    query: QueryType;
    params: ParamsType;

    url: string;
    method: string;
    headers: IncomingHttpHeaders;
}

type Handler<ResponseType,
    Body = never,
    Query = never,
    Params = never> =
    <ResponseType, Body, Query, Params>
        (request: RequestInfo<Body, Query, Params>) => ResponseType;

interface HandlerBuilder<Params> {
    get: <ResponseType, Body=never, Query=never>(requestInfo: RequestInfo<Body, Query, Params>) => ResponseType;
    post: <ResponseType, Body=never, Query=never>(requestInfo: RequestInfo<Body, Query, Params>) => ResponseType;
    put: <ResponseType, Body=never, Query=never>(requestInfo: RequestInfo<Body, Query, Params>) => ResponseType;
}

type RequestHandler<T> =
    ((req: ApiRequest<T>, res: ServerResponse) => void)
    & HandlerBuilder<T>;

const handler = <Params = {}>() => {
    const handlers = {
        'GET': undefined,
        'POST': undefined,
        'PUT': undefined
    };

    const result = (req: ApiRequest<Params>, res: ServerResponse) => {
        const method = req.method;
        const handler = handlers[method];

        if (!handler)
            return notFound(res);

        let body;
        try {
            body = json<any>(req);
        } catch {
            // Body isn't JSON.
        }

        const query = queryString.parseUrl(req.url).query;
        const requestInfo: RequestInfo<any, any, Params> = {
            // Params have a weird name in next.
            params: req.query,
            query: query,
            body: req,

            url: req.url,
            headers: req.headers,
            method: req.method
        };

        const response = handler(requestInfo);
        jsonResponse(response, res);
    };

    for (const method in ['GET', 'POST', 'PUT']) {
        result[method.toLowerCase()] = <ResponseType,
            Body = never,
            Query = never>(handler: Handler<ResponseType, Body, Query, Params>) => {
            handlers[method] = handler;
        };
    }

    return result as RequestHandler<Params>;
}