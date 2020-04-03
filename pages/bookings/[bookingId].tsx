import {  } from "next/dist/client/router"
import { RouteType } from "next/dist/lib/check-custom-routes"
import { RouteProps } from "../../model/routeProps"

interface Props extends RouteProps<{ bookingId: string }>  {

}
export default (props: Props) => {
    return <div>
        BookingId: {props.url.query.bookingId}
        Viewing Booking: {JSON.stringify(props)}
    </div>
}