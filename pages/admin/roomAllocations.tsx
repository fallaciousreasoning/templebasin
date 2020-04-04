import { Moment } from "moment";
import Layout from "../../components/Layout";
import PeriodView, { Period } from "../../components/PeriodView";
import useData from "../../services/useData";
import { BookingInfo } from "../../model/bookingInfo";
import { CircularProgress } from "@material-ui/core";

const periods: Period[] = ['day'];

const renderRooms = (day: Moment) => {
    const bookings = useData<BookingInfo[]>(`/api/bookings?on=${day.format('YYYY-MM-DD')}`);

    if (!bookings)
        return <CircularProgress/>;
    return <div>

    </div>;
}

export default () => {
    return <Layout title="Rooms">
        <PeriodView periods={periods}>
            {renderRooms}
        </PeriodView>
    </Layout>
}