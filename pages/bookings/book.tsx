import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import { ensureLoggedIn } from '../../client-services/firebase';
import BookingEditor from '../../components/BookingEditor';
import Layout from '../../components/Layout';
import { BookingInfo } from '../../model/bookingInfo';
import { AccomodationCategory } from '../../model/guest';
import { noLodgeChoice } from '../../model/lodge';

const initialBooking: BookingInfo = {
    startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
    duration: 1,

    contactEmail: '',
    contactPhone: '',

    guests: [{
        name: '',
        category: AccomodationCategory.Adult,
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

        const json = await fetch(`/api/bookings/new`, {
            method: 'POST',
            body: JSON.stringify(booking)
        }).then(r => r.json());
        router.replace(`/bookings/${json.id}`);
    }, []);

    useEffect(() => {
        ensureLoggedIn();
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
