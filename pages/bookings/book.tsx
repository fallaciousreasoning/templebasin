import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';
import BookingEditor from '../../components/BookingEditor';
import Form from '../../components/Form';
import Layout from '../../components/Layout';
import SubmitButton from '../../components/SubmitButton';
import { BookingInfo } from '../../model/bookingInfo';
import { updateBooking } from '../../services/bookings';


const Book = () => {
    const router = useRouter();
    const [booking, setBooking] = useState<BookingInfo>({} as any);
    const submit = useCallback(async () => {
        const bookingId = await updateBooking(booking);
        router.replace(`/bookings/${bookingId}`);
    }, [booking]);
    return <Layout title="Book">
        <Form>
            <BookingEditor booking={booking} onChanged={setBooking} />
            <SubmitButton onSubmit={submit}>Submit</SubmitButton>
        </Form>
    </Layout >
}

export default Book;
