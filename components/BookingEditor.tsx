import { BookingInfo } from "../model/bookingInfo";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GuestEditor from "./GuestEditor";
import { useCallback } from "react";
import { Guest } from "../model/guest";

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
    const ownerChanged = useCallback((owner: Guest) => props.onChanged({ ...props.booking, owner }), [props.onChanged, props.booking]);

    return <>
        <GuestEditor guest={props.booking.owner || {} as any} onChanged={ownerChanged}/>
    </>
}