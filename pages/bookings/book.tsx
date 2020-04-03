import Head from 'next/head'
import Layout from '../../components/Layout';
import BookingEditor from '../../components/BookingEditor';
import { Paper, makeStyles, Button } from '@material-ui/core';
import { useState, useCallback } from 'react';
import { BookingInfo } from '../../model/bookingInfo';
import Form from '../../components/Form';
import { updateBooking } from '../../services/bookings';
import { withRouter, Router } from 'next/dist/client/router';
import SubmitButton from '../../components/SubmitButton';


const Book = (props: { router: Router }) => {
    const [booking, setBooking] = useState<BookingInfo>({} as any);
    const submit = useCallback(async () => {
        const bookingId = await updateBooking(booking);
        props.router.replace(`/bookings/edit/${bookingId}`);
    }, [booking]);
    return <Layout title="Book">
        <Form>
            <BookingEditor booking={booking} onChanged={setBooking} />
            <SubmitButton onSubmit={submit}>Submit</SubmitButton>
        </Form>
    </Layout >
}

export default withRouter(Book);
