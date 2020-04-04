import Layout from "../../components/Layout"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment, { Moment } from 'moment';
import { makeStyles, ButtonGroup, Button, CircularProgress } from "@material-ui/core";
import useData from "../../services/useData";
import { DayInfo } from "../../model/dayInfo";
import { useState } from "react";
import { Doughnut, ChartData } from 'react-chartjs-2';
import { BookingInfo } from "../../model/bookingInfo";
import BookingTypeGraph from "../../components/BookingTypeGraph";
import PeriodView from "../../components/PeriodView";

const localizer = momentLocalizer(moment);
const views = {
    month: true,
};

const useStyles = makeStyles(theme => ({
    calendar: {
        height: '800px'
    }
}));

type Views = "day" | "week" | "month" | "year"
const possibleViews = ["day", "week", "month", "year"] as const;

const renderGraphs = (from: Moment, to: Moment) => {
    const infos = useData<BookingInfo[]>(`/api/bookings?from=${from.format('YYYY-MM-DD')}&to=${to.format('YYYY-MM-DD')}`);
    if (!infos)
        return <CircularProgress />

    const periodInfo = infos.reduce((prev, next) => {
        const guests = 1 + (isNaN(next.additionalGuests) ? 0 : next.additionalGuests);
        if (next.selfCatered)
            prev.selfCatered += guests;
        else if (next.includeLiftTickets)
            prev.packages += guests;
        else prev.dbb += guests;

        if (moment(next.startDate).isSameOrAfter(from))
            prev.checkins++;
        if (moment(next.startDate).add(next.duration, 'days').isSameOrBefore(to))
            prev.checkouts++;

        return prev;
    }, {
        dbb: 0,
        selfCatered: 0,
        packages: 0,
        checkins: 0,
        checkouts: 0
    });

    return <>
        <div>
            <b>Checkins:</b> {periodInfo.checkins} <b>Checkouts:</b> {periodInfo.checkouts}
        </div>
        <div>
            <h3>Booking Breakdown</h3>
            <BookingTypeGraph {...periodInfo} />
        </div>
    </>;
}

export default () => {
    return <Layout title="Overview">
        <PeriodView>
            {renderGraphs}
        </PeriodView>
    </Layout>
}