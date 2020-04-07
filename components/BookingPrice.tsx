import { useState, useEffect } from "react";
import { BookingInfo } from "../model/bookingInfo";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
    }
}));

export default (props: { booking: BookingInfo }) => {
    const styles = useStyles();
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
    return <Paper elevation={5} className={styles.container}>
        Total Price: ${price} NZD
    </Paper>
}