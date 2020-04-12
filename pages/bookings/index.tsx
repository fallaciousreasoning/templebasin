import { useEffect, useState } from "react";
import BookingView from "../../components/BookingView";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import useData from "../../utils/useData";
import { BookingInfo } from "../../model/bookingInfo";

export default () => {
    const bookings = useData<BookingInfo[]>(`/api/bookings`, []);
    return <Layout title="Bookings">
        {bookings ? bookings.map(b => <div key={b.id}>
            <BookingView booking={b} />
            <hr />
        </div>)
            : <Loader />}

    </Layout>
}