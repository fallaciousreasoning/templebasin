import Head from 'next/head'
import Layout from '../../components/Layout';
import BookingEditor from '../../components/BookingEditor';
import { Paper, makeStyles, Button } from '@material-ui/core';
import { useState, useCallback } from 'react';
import { BookingInfo } from '../../model/bookingInfo';
import Form from '../../components/Form';
import { makeBooking } from '../../services/bookings';
import { withRouter, Router } from 'next/dist/client/router';


const Book = (props: { router: Router }) => {
    const [booking, setBooking] = useState<BookingInfo>({} as any);
    const submit = useCallback(async () => {
        const bookingId = await makeBooking(booking);
        props.router.replace(`/bookings/edit/${bookingId}`);
    }, [booking]);
    return <Layout title="Book">
        <Form>
            <BookingEditor booking={booking} onChanged={setBooking} />
            <Button variant="contained" color="primary" onClick={submit}>Submit</Button>
        </Form>
    </Layout >
}

export default withRouter(Book);
