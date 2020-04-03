import { BookingInfo } from "../model/bookingInfo";
import { Button } from "@material-ui/core";
import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";

export default ({ booking }: { booking: BookingInfo }) => {
    const router = useRouter();
    const editBooking = useCallback(() => {
        router.push(`/bookings/${booking.id}/edit`);
    }, [booking.id]);

    return <div>
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
        <div>Number of Nights: {booking.duration}</div>
        <div>Additional Guests: {booking.additionalGuests}</div>
        <div>Catered: {booking.selfCatered ? "no" : "yes"}</div>
        <div>Includes Lift Tickets: {booking.includeLiftTickets ? "yes" : "no"}</div>
        <div>
            <Button variant="contained" color="primary" onClick={editBooking}>Edit</Button>
        </div>
    </div>
}