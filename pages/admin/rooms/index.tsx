import PeriodView, { Period } from "../../../components/PeriodView"
import { Moment } from "moment";
import Layout from "../../../components/Layout";
import useData from "../../../services/useData";
import { BookingInfo } from "../../../model/bookingInfo";

const periods: Period[] = ['day'];

const renderRooms = (from: Moment, to: Moment) => {
    
    return <div>

    </div>
}

export default () => {
    return <Layout title="Rooms">
        <PeriodView periods={periods}>
            {renderRooms}
        </PeriodView>
    </Layout>
}