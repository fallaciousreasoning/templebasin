import useData from "../utils/useData"

export interface Lodge {
    id?: string;
    name: string;
    occupancy: number;
    fillOrder: number;
    preferStudents: boolean;
}

export const useLodges = () => {
    return useData<Lodge[]>('/api/lodges', []);
}

export const noLodgeChoice = 'None' as const;