import { Doughnut } from "react-chartjs-2"
import { useState, useEffect } from "react";
import useData from "../services/useData";

interface BookingTypeStats {
    selfCatered: number;
    dbb: number;
    packages: number;
};

const useGraphData = (stats: BookingTypeStats) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData({
            labels: [
                'DBB',
                'Self Catered',
                'Package'
            ],
            datasets: [{
                data: [stats.dbb, stats.selfCatered, stats.packages],
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
    }, Object.values(stats));
    return data;
};

export default (props: BookingTypeStats) => {
    const data = useGraphData(props);
    return <Doughnut data={data}/>
}