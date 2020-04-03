import { useState, useEffect } from "react"
import { getBookings } from "../../services/bookings";
import Layout from "../../components/Layout";
import BookingView from "../../components/BookingView";
import { CircularProgress } from "@material-ui/core";

export default (props) => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        getBookings().then(bookings => setBookings(bookings));
    }, []);
    return <Layout title="Bookings">
        {bookings ? bookings.map(b => <div key={b.id}>
            <BookingView booking={b} />
            <hr />
        </div>)
            : <CircularProgress />}

    </Layout>
}