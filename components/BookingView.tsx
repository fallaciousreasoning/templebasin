import { BookingInfo } from "../model/bookingInfo";
import { Button, Paper, makeStyles } from "@material-ui/core";
import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles(theme => ({
    guest: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    }
}))
export default ({ booking }: { booking: BookingInfo }) => {
    const router = useRouter();
    const styles = useStyles();

    const editBooking = useCallback(() => {
        router.push(`/bookings/${booking.id}/edit`);
    }, [booking.id]);

    return <div>
        <h3>Contact Details</h3>
        <div>Email: {booking.contactEmail}</div>
        <div>Phone: {booking.contactPhone}</div>
        <h3>Booking Details</h3>
        <div>Start Date: {booking.startDate}</div>
        <div>Number of Nights: {booking.duration}</div>
        <h3>Guests</h3>
        {booking.guests.map((guest, i) => <Paper elevation={2} key={i} className={styles.guest}>
            <div>Name: {guest.name}</div>
            <div>Accomodation Category: {guest.category}</div>
            <div>Club Member: {guest.clubMember}</div>
            <div>Dietary Requirements: {guest.dietaryRequirements.join(', ') || 'None'}</div>
        </Paper>)}
        <div>Catered: {booking.selfCatered ? "no" : "yes"}</div>
        <div>Includes Lift Tickets: {booking.includeLiftTickets ? "yes" : "no"}</div>
        <div>
            <Button variant="contained" color="primary" onClick={editBooking}>Edit</Button>
        </div>
    </div>
}