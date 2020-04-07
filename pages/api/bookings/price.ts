import { ApiRequest } from "../../../model/apiRequest";
import { ServerResponse } from "http";
import { notFound, jsonResponse } from "../../../utils/response";
import { BookingInfo, bookingSchema } from "../../../model/bookingInfo";
import { json } from "../../../utils/request";
import { calculatePrice } from "../../../model/priceInfo";

export default async (req: ApiRequest, res: ServerResponse) => {
    if (req.method !== "POST") {
        return notFound(res);
    }

    const booking = json<BookingInfo>(req);
    const total = await calculatePrice(booking);
    jsonResponse({ total: total || 0 }, res);
}