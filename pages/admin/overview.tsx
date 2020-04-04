import Layout from "../../components/Layout"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { makeStyles, ButtonGroup, Button, CircularProgress } from "@material-ui/core";
import useData from "../../services/useData";
import { DayInfo } from "../../model/dayInfo";
import { useState } from "react";
import { Doughnut, ChartData } from 'react-chartjs-2';
import { BookingInfo } from "../../model/bookingInfo";

const localizer = momentLocalizer(moment);
const views = {
    month: true,
};

const useStyles = makeStyles(theme => ({
    calendar: {
        height: '800px'
    }
}));

type Views = "day" | "month" | "year"
const possibleViews = ["day", "month", "year"] as const;

export default () => {
    const classes = useStyles();

    const [date, setDate] = useState(moment());
    const [view, setView] = useState<Views>("month");

    const from = moment(date).startOf(view);
    const to = moment(date).endOf(view);
    const infos = useData<BookingInfo[]>(`/api/bookings?from=${from.format('YYYY-MM-DD')}&to=${to.format('YYYY-MM-DD')}`);

    let content: React.ReactNode = <CircularProgress />;

    if (infos) {
        const periodInfo = infos.reduce((prev, next) => {
            const guests = 1 + (isNaN(next.additionalGuests) ? 0 : next.additionalGuests);
            if (next.selfCatered)
                prev.selfCatered += guests;
            else if (next.includeLiftTickets)
                prev.packages += guests;
            else prev.dbb += guests;

            return prev;
        }, {
            dbb: 0,
            selfCatered: 0,
            packages: 0,
        });

        content = <>
            <div>
                <h3>Booking Breakdown</h3>
                <Doughnut data={{
                    labels: [
                        'DBB',
                        'Self Catered',
                        'Package'
                    ],
                    datasets: [{
                        data: [periodInfo.dbb, periodInfo.selfCatered, periodInfo.packages],
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
                }} />
            </div>
        </>
    }

    return <Layout title="Overview">
        <ButtonGroup variant="contained" aria-label="contained primary button group">
            {possibleViews.map(v => <Button key={v} color={view === v ? "primary" : "default"} onClick={() => setView(v)}>
                {v}
            </Button>)}
        </ButtonGroup>
        {content}
    </Layout>
}