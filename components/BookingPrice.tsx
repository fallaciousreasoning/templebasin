import { useState, useEffect } from "react";
import { BookingInfo } from "../model/bookingInfo";

export default (props: { booking: BookingInfo }) => {
    const [price, setPrice] = useState(0);
    useEffect(() => {
        let isValid = true;

        fetch('/api/bookings/price', {
            method: 'POST',
            body: JSON.stringify(props.booking)
        }).then(r => r.json())
            .then(price => {
                if (isValid)
                    setPrice(price.total);
            })

        return () => {
            isValid = false;
        }
    }, [
        props.booking.duration,
        props.booking.includeLiftTickets,
        props.booking.selfCatered,
        props.booking.guests
    ]);
    return <div>
        <b>Total Price:</b> {price}
    </div>
}