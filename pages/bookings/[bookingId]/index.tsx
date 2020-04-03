import Layout from "../../../components/Layout"
import { useQuery } from "../../../model/routeProps";
import { Paper, CircularProgress, Button } from "@material-ui/core";
import { useBooking } from "../../../services/bookings";
import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";

export default () => {
    const router = useRouter();
    const query = useQuery<{ bookingId: string }>();
    const booking = useBooking(query.bookingId);
    const editBooking = useCallback(() => {
        router.push(`/bookings/${query.bookingId}/edit`);
    }, [query.bookingId]);

    const content = booking
        ? <div>
            <h3>Personal Information</h3>
            <div>Name: {booking.owner.firstName} {booking.owner.lastName}</div>
            <div>Date of Birth: {booking.owner.dateOfBirth}</div>
            <div>Student: {booking.owner.student ? "yes" : "no"}</div>
            <div>Member of Temple Basin: {booking.owner.member ? "yes" : "no"}</div>
            <h3>Contact Details</h3>
            <div>Email: {booking.owner.email}</div>
            <div>Phone: {booking.owner.phone}</div>
            <h3>Booking Details</h3>
            <div>Start Date: {booking.startDate}</div>
            <div>Number of Nights: </div>
            <div>Catered: {booking.selfCatered ? "no" : "yes"}</div>
            <div>Includes Lift Tickets: {booking.includeLiftTickets ? "yes" : "no"}</div>
            <hr/>
            <div>
                <Button variant="contained" color="primary" onClick={editBooking}>Edit</Button>
            </div>
        </div>
        : <CircularProgress />;

    return <Layout title="View Booking">
        {content}
    </Layout>
};