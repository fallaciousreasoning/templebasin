import { useEffect, useState } from "react";
import BookingView from "../../components/BookingView";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { getBookings } from "../../services/bookings";

export default () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        getBookings().then(bookings => setBookings(bookings));
    }, []);
    return <Layout title="Bookings">
        {bookings ? bookings.map(b => <div key={b.id}>
            <BookingView booking={b} />
            <hr />
        </div>)
            : <Loader />}

    </Layout>
}