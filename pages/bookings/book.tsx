import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';
import BookingEditor from '../../components/BookingEditor';
import Layout from '../../components/Layout';
import { BookingInfo } from '../../model/bookingInfo';
import { updateBooking } from '../../services/bookings';

const initialBooking: BookingInfo = {
    additionalGuests: 0,
    owner: {
        firstName: "",
        lastName: "",
        dateOfBirth: moment().format('YYYY-MM-DD'),
        email: "",
        member: false,
        phone: "",
        student: false
    },
    duration: 1,
    includeLiftTickets: true,
    selfCatered: false,
    startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
};
const Book = () => {
    const router = useRouter();
    const submit = useCallback(async (booking: BookingInfo) => {
        const bookingId = await updateBooking(booking);
        router.replace(`/bookings/${bookingId}`);
    }, []);
    return <Layout title="Book">
        <BookingEditor initialValue={initialBooking} onSubmit={submit} />
    </Layout >
}

export default Book;
