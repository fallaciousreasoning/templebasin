import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';
import BookingEditor from '../../components/BookingEditor';
import Layout from '../../components/Layout';
import { BookingInfo } from '../../model/bookingInfo';
import { updateBooking } from '../../services/bookings';

const initialBooking: BookingInfo = {
    startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
    duration: 1,

    contactEmail: '',
    contactPhone: '',

    guests: [{
        name: '',
        category: 'Adult',
        clubMember: false,
        diertaryRequirements: [],
    }],

    selfCatered: false,
    includeLiftTickets: true,

    preferredLodge: 'None',
    additionalComments: '',
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
