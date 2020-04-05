import { makeStyles } from "@material-ui/core";
import moment, { Moment } from 'moment';
import BookingTypeGraph from "../../components/BookingTypeGraph";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import OccupancyBreakdown from "../../components/OccupancyBreakdown";
import PeriodView from "../../components/PeriodView";
import { BookingInfo } from "../../model/bookingInfo";
import useData from "../../services/useData";
import round from "../../utils/round";

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
        return <Loader />

    const periodInfo = infos.reduce((prev, next) => {
        const guests = 1 + (isNaN(next.additionalGuests) ? 0 : next.additionalGuests);
        const checkoutDate = moment(next.startDate).add(next.duration, 'days');
        const checkinDate = moment(next.startDate);

        if (next.selfCatered)
            prev.selfCatered += guests;
        else if (next.includeLiftTickets)
            prev.packages += guests;
        else prev.dbb += guests;

        if (checkinDate.isSameOrAfter(from))
            prev.checkins += guests;
        if (checkoutDate.isSameOrBefore(to))
            prev.checkouts += guests;
        
        const firstDay = moment.max(checkinDate, from);
        const lastDay = moment.min(checkoutDate, to);
        const diff = lastDay.diff(firstDay, 'days') + 1;
        if (diff > 0)
            prev.bedNights += diff * guests;

        return prev;
    }, {
        dbb: 0,
        selfCatered: 0,
        packages: 0,
        checkins: 0,
        checkouts: 0,
        bedNights: 0,
        numNights: to.diff(from, 'days') + 1
    });

    return <>
        <div>
            <b>Bed Nights:</b> {periodInfo.bedNights}
        </div>
        <div>
            <b>Average beds used a night:</b> {round(periodInfo.bedNights/periodInfo.numNights, 2)} (over {periodInfo.numNights} nights)
        </div>
        <div>
            <b>Checkins:</b> {periodInfo.checkins} <b>Checkouts:</b> {periodInfo.checkouts}
        </div>
        <div>
            <h3>Booking Breakdown</h3>
            <BookingTypeGraph {...periodInfo} />
            <h3>Occupancy by Lodge</h3>
            <OccupancyBreakdown from={from} to={to}/>
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