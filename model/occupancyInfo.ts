export interface OccupancyInfo {
    name: string;
    id: string;
    occupancy: number;
    occupied: number
}

export type OccupancyList = OccupancyInfo[];