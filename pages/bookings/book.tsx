import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';
import BookingEditor from '../../components/BookingEditor';
import Layout from '../../components/Layout';
import { BookingInfo } from '../../model/bookingInfo';
import { updateBooking } from '../../services/bookings';
import { noLodgeChoice } from '../../model/lodge';

const initialBooking: BookingInfo = {
    startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
    duration: 1,

    contactEmail: '',
    contactPhone: '',

    guests: [{
        name: '',
        category: 'Adult',
        clubMember: false,
        dietaryRequirements: [],
    }],

    selfCatered: false,
    includeLiftTickets: true,

    preferredLodge: noLodgeChoice,
    additionalComments: '',
};
const Book = () => {
    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const submit = useCallback(async (booking: BookingInfo) => {
        const errors = await fetch(`/api/bookings/canBook`, {
            method: 'POST',
            body: JSON.stringify(booking)
        }).then(r => r.json()) as string[];

        if (errors.length) {
            setErrors(errors);
            return;
        }

        const bookingId = await updateBooking(booking);
        router.replace(`/bookings/${bookingId}`);
    }, []);
    return <Layout title="Book">
        <BookingEditor initialValue={initialBooking} onSubmit={submit} />
        {errors.length !== 0 && <ul>
            {errors.map((e, i) => <li key={i}>
                {e}
            </li>)}
        </ul>}
    </Layout >
}

export default Book;
