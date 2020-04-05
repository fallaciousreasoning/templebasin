import { makeStyles } from "@material-ui/core";
import MaterialTable from 'material-table';
import { Moment } from "moment";
import { useMemo } from "react";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import PeriodView, { Period } from "../../components/PeriodView";
import { BedInfo } from "../../model/bedInfo";
import { Lodge } from "../../model/lodge";
import useData from "../../services/useData";
import { OccupancyInfo } from "../../model/occupancyInfo";

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
    { title: 'Rooms', field: 'rooms' },
];

const renderRooms = (day: Moment) => {
    const classes = useStyles();
    const on = day.format('YYYY-MM-DD');
    const bedInfo = useData<BedInfo[]>(`/api/beds?on=${on}`);
    const occupancy = useData<OccupancyInfo[]>(`/api/occupancy?on=${on}`, []);

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