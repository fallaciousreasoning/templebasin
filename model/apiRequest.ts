import { IncomingMessage } from "http";

export interface ApiRequest<T = {}> extends IncomingMessage {
    body: string;
    query: T;
}