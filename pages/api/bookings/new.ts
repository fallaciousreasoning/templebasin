import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import { notFound, jsonResponse } from "../../../utils/response";
import { updateBooking } from "../../../services/bookings";
import { json } from "../../../utils/request";
import { BookingInfo } from "../../../model/bookingInfo";

export default async (req: ApiRequest, res: ServerResponse) => {
    if (req.method === "POST") {
        const booking = json<BookingInfo>(req);
        booking.id = undefined;

        const id = await updateBooking(booking);
        res.statusCode = 200;
        jsonResponse({ id }, res);
    } else {
        notFound(res);
    }
}