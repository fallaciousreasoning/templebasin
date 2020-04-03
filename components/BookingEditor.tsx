import { BookingInfo } from "../model/bookingInfo";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GuestEditor from "./GuestEditor";
import { useCallback } from "react";
import { Guest } from "../model/guest";
import PropertyEditor from "./PropertyEditor";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: 200,
        },
    },
}));

interface Props {
    booking: BookingInfo;
    onChanged: (booking: BookingInfo) => void;
}

export default (props: Props) => {
    const classes = useStyles();
    const onChanged = useCallback((update: Partial<BookingInfo>) => props.onChanged({ ...props.booking, ...update }), [props.booking, props.onChanged]);
    const ownerChanged = useCallback((owner: Guest) => onChanged({ 
        owner: { 
            ...props.booking.owner,
            ...owner
        }}), [onChanged, props.booking.owner]);

    return <>
        <GuestEditor guest={props.booking.owner || {} as any} onChanged={ownerChanged} />
        <PropertyEditor
            onChange={props.onChanged}
            type="date"
            value={props.booking}
            label="Start Date"
            required
            propertyName="startDate"
        />
        <PropertyEditor
            onChange={props.onChanged}
            type="check"
            value={props.booking}
            label="Include Lift Tickets"
            propertyName="includeLiftTickets"
        />
        <PropertyEditor
            onChange={props.onChanged}
            type="check"
            value={props.booking}
            label="Self Catered"
            propertyName="selfCatered"
        />
    </>
}