import { Moment } from "moment";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import PeriodView, { Period } from "../../components/PeriodView";
import { BookingInfo } from "../../model/bookingInfo";
import useData from "../../services/useData";
import { TextField, makeStyles } from "@material-ui/core";
import { useState } from "react";

const periods: Period[] = ['day'];

const useStyles = makeStyles(theme => ({
    rooms: {
        marginTop: theme.spacing(1)
    }
}));

const renderRooms = (day: Moment) => {
    const classes = useStyles();
    const [filter, setFilter] = useState("");
    const bookings = useData<BookingInfo[]>(`/api/bookings?on=${day.format('YYYY-MM-DD')}`);

    if (!bookings)
        return <Loader/>;

    return <div className={classes.rooms}>
        <TextField label="Filter"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={e => setFilter(e.target.value)}/>

        <div>
            {bookings.map(b => <div>
                {b.owner.firstName} {b.owner.lastName}
            </div>)}
        </div>
    </div>;
}

export default () => {
    return <Layout title="Rooms">
        <PeriodView periods={periods} defaultPeriod='day'>
            {renderRooms}
        </PeriodView>
    </Layout>
}