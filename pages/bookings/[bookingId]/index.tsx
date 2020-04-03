import Layout from "../../../components/Layout"
import { useQuery } from "../../../model/routeProps";
import { Paper, CircularProgress, Button } from "@material-ui/core";
import { useBooking } from "../../../services/bookings";
import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import BookingView from "../../../components/BookingView";

export default () => {
    const query = useQuery<{ bookingId: string }>();
    const booking = useBooking(query.bookingId);

    const content = booking
        ? <BookingView booking={booking} />
        : <CircularProgress />;

    return <Layout title="View Booking">
        {content}
    </Layout>
};