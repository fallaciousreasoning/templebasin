export interface RouteProps<T> {
    url: {
        query: T;
        pathname: string;
        asPath: string;
    }
}