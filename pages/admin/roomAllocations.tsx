import moment, { Moment } from "moment";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import PeriodView, { Period } from "../../components/PeriodView";
import { BookingInfo } from "../../model/bookingInfo";
import useData from "../../services/useData";
import { TextField, makeStyles, Paper } from "@material-ui/core";
import { useState, useMemo } from "react";
import MaterialTable from 'material-table';
import { getNumGuests } from "../../services/bookings";
import { Lodge } from "../../model/lodge";

const periods: Period[] = ['day'];

const useStyles = makeStyles(theme => ({
    rooms: {
        marginTop: theme.spacing(1)
    },
    room: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1)
    }
}));

const RoomCard = (props: { booking: BookingInfo }) => {
    const classes = useStyles();
    return <Paper className={classes.room}>
        <h3>Booking for {props.booking.owner.firstName} {props.booking.owner.lastName}</h3>
        {props.booking.owner.firstName} {props.booking.owner.lastName}
    </Paper>;
}
const roomColumns: { title: string, field: string, type?: string }[] = [
    { title: "Checkin", field: 'checkin' },
    { title: "Checkout", field: 'checkout' },
    { title: 'Owner', field: 'name' },
    { title: 'Guests', field: 'guests' },
    { title: 'Lodge', field: 'lodge' },
    { title: 'First Room', field: 'startRoom' },
    { title: 'Last Room', field: 'endRoom' }
];

const renderRooms = (day: Moment) => {
    const classes = useStyles();
    const bookings = useData<BookingInfo[]>(`/api/bookings?on=${day.format('YYYY-MM-DD')}`);
    const lodges = useData<Lodge[]>(`/api/lodges`);
    const lodgesMap = useMemo(() => (lodges || []).reduce((prev, next) => ({ ...prev, [next.id]: next }), {} as { [key: string]: Lodge }), [lodges]);
    
    const rooms = useMemo(() => {
        if (!bookings)
          return [];

        return bookings.map(b => ({
            checkin: moment(b.startDate).format('DD-MM-YYYY'),
            checkout: moment(b.startDate).add(b.duration, 'days').format('DD-MM-YYYY'),
            name: `${b.owner.firstName} ${b.owner.lastName}`,
            guests: getNumGuests(b),
            lodge: (lodgesMap[b.lodge] || {}).name,
            startRoom: b.startRoom,
            endRoom: b.startRoom + getNumGuests(b) - 1
        }));
    }, [bookings, lodgesMap]);

    if (!bookings)
        return <Loader />;

    return <div className={classes.rooms}>

        <MaterialTable
            columns={roomColumns as any}
            data={rooms}
            title="Room Allocations" />
    </div>;
}

export default () => {
    return <Layout title="Rooms">
        <PeriodView periods={periods} defaultPeriod='day'>
            {renderRooms}
        </PeriodView>
    </Layout>
}