import { Doughnut } from "react-chartjs-2"
import { useState, useEffect, useMemo } from "react";
import useData from "../utils/useData";
import { Moment } from "moment";
import { OccupancyInfo } from "../model/occupancyInfo";

interface Props {
    from: Moment;
    to: Moment;
};

const useGraphData = (totals: OccupancyInfo[]) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData({
            labels: totals.map(t => t.name),
            datasets: [{
                data: totals.map(t => t.occupied),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        })
    }, [totals]);
    return data;
};

export default (props: Props) => {
    const formatString = 'YYYY-MM-DD';
    const totals = useData<OccupancyInfo[]>(`/api/occupancy?from=${props.from.format(formatString)}&to=${props.to.format(formatString)}`, []);
    const sansTotal = useMemo(() => totals.filter(t => t.id !== 'total'), [totals]);
    const data = useGraphData(sansTotal);

    return <Doughnut data={data}/>
}