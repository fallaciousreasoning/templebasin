import { useState, useEffect } from "react"
import { getBookings } from "../../services/bookings";

export default (props) => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        getBookings().then(bookings => setBookings(bookings));
    }, []);
    return <div>
        Listing Bookings
        {JSON.stringify(bookings)}
    </div>
}