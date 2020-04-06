import { makeStyles } from "@material-ui/core"
import { useRouter } from "next/dist/client/router"
import { useCallback, useEffect, useState } from "react"
import BookingEditor from "../../../components/BookingEditor"
import Form from "../../../components/Form"
import Layout from "../../../components/Layout"
import Loader from "../../../components/Loader"
import SubmitButton from "../../../components/SubmitButton"
import { BookingInfo } from "../../../model/bookingInfo"
import { useQuery } from "../../../model/routeProps"
import { getBooking, updateBooking } from "../../../services/bookings"

const useStyles = makeStyles(theme => ({
    progress: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}))
export default () => {
    const classes = useStyles();
    const router = useRouter();
    const query = useQuery<{ bookingId: string}>();

    const [booking, setBooking] = useState<BookingInfo>(undefined);

    useEffect(() => {
        getBooking(query.bookingId).then(setBooking);
    }, [query.bookingId]);

    const saveBooking = useCallback(async (booking) => {
        await updateBooking(booking);
        router.push(`/bookings/${query.bookingId}`);
    }, [booking]);
    
    const content = booking
        ? <BookingEditor initialValue={booking} onSubmit={saveBooking}/>
        : <Loader className={classes.progress}/>

    return <Layout title="Edit Booking">
        <Form>
            {content}
        </Form>
    </Layout>
};