import BookingView from "../../../components/BookingView";
import Layout from "../../../components/Layout";
import Loader from "../../../components/Loader";
import { useQuery } from "../../../model/routeProps";
import { useBooking } from "../../../services/bookings";

export default () => {
    const query = useQuery<{ bookingId: string }>();
    const booking = useBooking(query.bookingId);

    const content = booking
        ? <BookingView booking={booking} />
        : <Loader />;

    return <Layout title="View Booking">
        {content}
    </Layout>
};