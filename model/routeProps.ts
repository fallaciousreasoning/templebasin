import { Router, useRouter } from "next/dist/client/router";

export interface RouteProps<T> {
    router: Router & {
        query: T
    }
}

export const useQuery = <T>() => {
    const router = useRouter();

    return (router ? router.query : {}) as unknown as T;
}