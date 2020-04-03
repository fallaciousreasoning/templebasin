import Layout from "../../components/Layout"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { makeStyles } from "@material-ui/core";
import useData from "../../services/useData";
import { DayInfo } from "../../model/dayInfo";
import { useState } from "react";

const localizer = momentLocalizer(moment);
const views = {
    month: true,
};

const useStyles = makeStyles(theme => ({
    calendar: {
        height: '800px'
    }
}));
export default () => {
    const classes = useStyles();

    const [date, setDate] = useState(moment());

    const infos = useData<DayInfo[]>(`/api/bookings/${date.format('YYYY-MM-DD')}`);

    let events: DayInfo[] = [];
    if (infos) {
        const bookings = infos.map(d => ({ ...d, title: `${d.roomsUsed} rooms used` }));
        const breakfasts = infos.map(d => ({ ...d, title: `${d.breakfasts} breakfasts` }));
        const lunches = infos.map(d => ({ ...d, title: `${d.lunches} lunches` }));
        const dinners = infos.map(d => ({ ...d, title: `${d.dinners} dinners` }));
        events = [...bookings, ...breakfasts, ...lunches, ...dinners];
    }

    return <Layout title="Overview">
        <Calendar
            views={views}
            className={classes.calendar}
            events={events || []}
            localizer={localizer} 
            onNavigate={date => setDate(moment(date))}/>
    </Layout>
}