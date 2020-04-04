import { Moment } from "moment";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import PeriodView, { Period } from "../../components/PeriodView";
import { BookingInfo } from "../../model/bookingInfo";
import useData from "../../services/useData";

const periods: Period[] = ['day'];

const renderRooms = (day: Moment) => {
    const bookings = useData<BookingInfo[]>(`/api/bookings?on=${day.format('YYYY-MM-DD')}`);

    if (!bookings)
        return <Loader/>;

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