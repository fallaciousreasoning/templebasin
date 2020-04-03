import Layout from "../../components/Layout"
import { useQuery } from "../../model/routeProps";

export default () => {
    const query = useQuery<{ bookingId: string }>();
    
    return <Layout title="View Booking">
        BookingId: {query.bookingId}
        Viewing Booking: {JSON.stringify(query)}
    </Layout>
};