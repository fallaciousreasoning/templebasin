import { RouteProps } from "../../../model/routeProps"
import BookingEditor from "../../../components/BookingEditor"
import { useState, useEffect } from "react"
import { BookingInfo } from "../../../model/bookingInfo"
import Layout from "../../../components/Layout"
import Form from "../../../components/Form"
import { CircularProgress, makeStyles } from "@material-ui/core"
import { getBookings, getBooking } from "../../../services/bookings"

const useStyles = makeStyles(theme => ({
    progress: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}))
export default (props: RouteProps<{ bookingId: string }>) => {
    const classes = useStyles();
    const [booking, setBooking] = useState<BookingInfo>(undefined);

    useEffect(() => {
        getBooking(props.url.query.bookingId).then(setBooking);
    }, [props.url.query.bookingId]);

    return <Layout title="Edit Booking">
        <Form>
            {booking
                ? <BookingEditor booking={booking} onChanged={setBooking} />
                : <CircularProgress className={classes.progress} variant='indeterminate'/>}
        </Form>
    </Layout>
}