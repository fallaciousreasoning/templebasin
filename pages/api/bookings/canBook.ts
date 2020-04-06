import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import { BookingInfo, bookingSchema } from "../../../model/bookingInfo";
import { notFound, error, jsonResponse } from "../../../utils/response";
import { json } from "../../../utils/request";
import * as yup from 'yup'
import moment from "moment";
import { assignRoom, MinInfoForRoom } from "../../../services/room";

const getValidator = () => yup.object().shape({
    startDate: yup.date()
        .min(new Date(), "Can't make a booking in the past")
        .max(moment().add(1, 'year').toDate(), "Can't make a booking more than a year in the future"),

    duration: bookingSchema.fields.duration,
    guests: yup.array()
        .min(1, "Booking must have at least one guest")
        .max(5, "Booking must have at most 5 guests")
});

// Request is /canBook, which expects a Partial<BookingInfo> with at least
// a startDate, duration and number of guests.
// Returns true if there is space, otherwise false.
export default async (req: ApiRequest, res: ServerResponse) => {
    if (req.method !== 'POST') {
        return notFound(res);
    }

    const params = json<MinInfoForRoom>(req);
    const validator = getValidator();

    try {
        // Throws on error.
        await validator.validate(params);
        // Throws on error.
        assignRoom(params);

        // Respond with an empty list of validation errors.
        jsonResponse([], res);
    } catch (err) {
        err = Array.isArray(err) ? err : [err];
        return error(err, res);
    }
}