import Head from 'next/head'
import Layout from '../../components/Layout';
import BookingEditor from '../../components/BookingEditor';
import { Paper, makeStyles, Button } from '@material-ui/core';
import { useState } from 'react';
import { BookingInfo } from '../../model/bookingInfo';
import Form from '../../components/Form';


const Book = () => {
    const [booking, setBooking] = useState<BookingInfo>({} as any);

    return <Layout title="Book">
        <Form>
            <BookingEditor booking={booking} onChanged={setBooking} />
            <Button variant="contained" color="primary">Submit</Button>
        </Form>
    </Layout >
}

export default Book
