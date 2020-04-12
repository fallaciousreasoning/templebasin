import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import { notFound, jsonResponse } from "../../../utils/response";
import { getBooking, updateBooking } from "../../../services/bookings";
import { json } from "../../../utils/request";
import { BookingInfo } from "../../../model/bookingInfo";

export default async (req: ApiRequest<{ bookingId: string }>, res: ServerResponse) => {
    if (req.method === "GET") {
        const booking = await getBooking(req.query.bookingId);
        jsonResponse(booking, res);
    } else if (req.method === "PUT") {
        const booking = json<BookingInfo>(req);
        booking.id = req.query.bookingId;
        await updateBooking(booking);
        res.statusCode = 204;
        res.end();
    } else {
        notFound(res); 
    }
}