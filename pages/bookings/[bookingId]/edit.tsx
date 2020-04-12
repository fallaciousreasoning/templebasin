import { makeStyles } from "@material-ui/core"
import { useRouter } from "next/dist/client/router"
import { useCallback } from "react"
import BookingEditor from "../../../components/BookingEditor"
import Layout from "../../../components/Layout"
import Loader from "../../../components/Loader"
import { useQuery } from "../../../model/routeProps"
import { useBooking } from "../../../model/bookingInfo"

const useStyles = makeStyles(theme => ({
    progress: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}))
export default () => {
    const classes = useStyles();
    const router = useRouter();
    const query = useQuery<{ bookingId: string }>();

    const booking = useBooking(query.bookingId);
    const saveBooking = useCallback(async (booking) => {
        await fetch(`/api/bookings/${query.bookingId}`, {
            method: 'PUT',
            body: JSON.stringify(booking)
        });
        router.push(`/bookings/${query.bookingId}`);
    }, [query.bookingId]);

    const content = booking
        ? <BookingEditor initialValue={booking} onSubmit={saveBooking} />
        : <Loader className={classes.progress} />

    return <Layout title="Edit Booking">
        {content}
    </Layout>
};