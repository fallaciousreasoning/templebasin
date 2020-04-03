import { RouteProps, useQuery } from "../../../model/routeProps"
import BookingEditor from "../../../components/BookingEditor"
import { useState, useEffect, useCallback } from "react"
import { BookingInfo } from "../../../model/bookingInfo"
import Layout from "../../../components/Layout"
import Form from "../../../components/Form"
import { CircularProgress, makeStyles } from "@material-ui/core"
import { getBookings, getBooking, updateBooking } from "../../../services/bookings"
import SubmitButton from "../../../components/SubmitButton"

const useStyles = makeStyles(theme => ({
    progress: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}))
export default () => {
    const classes = useStyles();
    const query = useQuery<{ bookingId: string}>();

    const [booking, setBooking] = useState<BookingInfo>(undefined);

    useEffect(() => {
        getBooking(query.bookingId).then(setBooking);
    }, [query.bookingId]);

    const saveBooking = useCallback(async () => updateBooking(booking), [booking]);
    const content = booking
        ? <>
            <BookingEditor booking={booking} onChanged={setBooking}/>
            <SubmitButton onSubmit={saveBooking}>Save</SubmitButton>
        </>
        : <CircularProgress className={classes.progress}/>

    return <Layout title="Edit Booking">
        <Form>
            {content}
        </Form>
    </Layout>
};