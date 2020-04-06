import { BookingInfo, bookingSchema } from "../model/bookingInfo";
import { makeStyles } from '@material-ui/core/styles';
import GuestEditor from "./GuestEditor";
import { useCallback } from "react";
import { Guest } from "../model/guest";
import PropertyEditor from "./PropertyEditor";
import { Formik, Field, ErrorMessage } from "formik";
import Form from "./Form";
import { TextField, Checkbox } from 'formik-material-ui'
import { Button } from "@material-ui/core";
import { object, number } from "yup";

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

const validNights = [1, 2, 3, 4, 5, 6, 7];
export default (props: Props) => {
    const classes = useStyles();
    const onChanged = useCallback((update: Partial<BookingInfo>) => props.onChanged({ ...props.booking, ...update }),
        [props.booking, props.onChanged]);

    console.log(props.booking)
    return <Formik
        initialValues={props.booking}
        validationSchema={bookingSchema}
        validateOnChange
        validateOnBlur
        onSubmit={props.onChanged}>
        {({ submitForm, isSubmitting }) => <Form>
            <Field component={TextField}
                type="date"
                label="Start Date"
                name="startDate"
                fullWidth />
            <Field component={TextField}
                type="number"
                label="Nights Stay"
                name="duration"
                fullWidth />

            <Field component={TextField}
                type="number"
                label="Additional Guests"
                name="additionalGuests"
                fullWidth />

            <Field component={Checkbox}
                type="checkbox"
                label="Include Lift Tickets"
                name="includeLiftTickets"
            />
            <Field component={Checkbox}
                type="checkbox"
                label="Self Catered"
                name="selfCatered"
            />
            <Button onClick={submitForm}>Submit</Button>
        </Form>}
    </Formik>

    return <>
        <PropertyEditor
            onChange={onChanged}
            type="number"
            value={props.booking}
            label="Additional Guests"
            propertyName="additionalGuests"
        />
    </>
}