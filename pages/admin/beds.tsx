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
import { BedInfo } from "../../model/bedInfo";

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

const roomColumns: { title: string, field: string, type?: string }[] = [
    { title: "Checkin", field: 'checkin' },
    { title: "Checkout", field: 'checkout' },
    { title: 'Owner', field: 'owner' },
    { title: 'Guests', field: 'guests' },
    { title: 'Lodge', field: 'lodge' },
    { title: 'First Room', field: 'startRoom' },
    { title: 'Last Room', field: 'endRoom' }
];

const renderRooms = (day: Moment) => {
    const classes = useStyles();
    const bedInfo = useData<BedInfo[]>(`/api/beds?on=${day.format('YYYY-MM-DD')}`);
    const lodges = useData<Lodge[]>('/api/lodges');
    const occupancy = useMemo(() => {
        if (!lodges || !bedInfo)
            return [];

        const result: {
            [key: string]: {
                id: string;
                name: string;
                occupancy: number;
                occupied: number;
            }
        } = {};

        for (const lodge of lodges)
            result[lodge.id] = { id: lodge.id, occupancy: lodge.occupancy, occupied: 0, name: lodge.name };

        for (const night of bedInfo) {
            result[night.lodgeId].occupied += night.guests;
        }

        return Object.values(result);
    }, [bedInfo, lodges]);

    if (!bedInfo)
        return <Loader />;

    return <div className={classes.rooms}>
        <div>
            {occupancy.map(o => <div key={o.id}>
                <b>{o.name}:</b> {o.occupied}/{o.occupancy} rooms occupied.
            </div>)}
        </div>
        <MaterialTable
            columns={roomColumns as any}
            data={bedInfo}
            title="Beds" />
    </div>;
}

export default () => {
    return <Layout title="Beds">
        <PeriodView periods={periods} defaultPeriod='day'>
            {renderRooms}
        </PeriodView>
    </Layout>
}