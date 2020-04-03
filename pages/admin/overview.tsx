import Layout from "../../components/Layout"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { makeStyles } from "@material-ui/core";

const localizer = momentLocalizer(moment);
const useStyles = makeStyles(theme => ({
    calendar: {
        height: '500px'
    }
}))
export default () => {
    const month = 7;
    const year = new Date().getFullYear();

    const classes = useStyles();
    return <Layout title="Overview">
        <Calendar
            elementProps={{ className: classes.calendar }}
            events={[{ start: new Date(), end: new Date() }]}
            localizer={localizer}/>
    </Layout>
}