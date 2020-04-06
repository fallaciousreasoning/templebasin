import { Button, Paper, makeStyles, IconButton } from "@material-ui/core";
import { Field, Formik, Form, useFormikContext } from "formik";
import { TextField } from 'formik-material-ui';
import { BookingInfo, bookingSchema } from "../model/bookingInfo";
import LabeledCheckbox from "./LabeledCheckbox";
import { useCallback } from "react";
import { Guest, newGuest } from "../model/guest";
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
    initialValue: BookingInfo;
    onSubmit: (booking: BookingInfo) => Promise<any>;
}

const useStyles = makeStyles(theme => ({
    guestEditor: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    guestHeader: {
        width: '100%',
        display: 'flex',
        '&> *': {
            flex: 1
        },
        '&> button': {
            alignSelf: 'flex-end',
            flex: 0
        }
    }
}));

const GuestEditor = (props: { guestNum: number, guest: Guest }) => {
    const styles = useStyles();
    const field = (name: string) => `guests[${props.guestNum}].${name}`;
    const { values: { guests }, setFieldValue } = useFormikContext<BookingInfo>();

    const removeGuest = useCallback(() => {
        const newGuests = [...guests];
        newGuests.splice(props.guestNum, 1);
        setFieldValue('guests', newGuests);
    }, [setFieldValue, guests]);

    const canRemove =guests.length > 1;

    return <Paper className={styles.guestEditor}>
        <div className={styles.guestHeader}>
            <h3>Guest {props.guestNum + 1}</h3>
            {canRemove && <IconButton onClick={removeGuest}>
                <DeleteIcon />
            </IconButton>}
        </div>
        <Field
            component={TextField}
            name={field('name')}
            type="text"
            label="Name"
            fullWidth
        />

        <Field
            component={LabeledCheckbox}
            type="checkbox"
            label="Temple Basin Member"
            name={field('clubMember')} />
    </Paper>;
}

export default (props: Props) => {
    const submit = useCallback(async (value, { setSubmitting }) => {
        await props.onSubmit(value);
        setSubmitting(false);
    }, [props.onSubmit]);

    return <Formik
        initialValues={props.initialValue}
        validationSchema={bookingSchema}
        validateOnChange
        validateOnBlur
        onSubmit={submit}>
        {({ submitForm, values, setFieldValue }) => <Form>
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

            <h2>Contact Info</h2>
            <Field
                component={TextField}
                type="email"
                label="Email"
                name="contactEmail"
                fullWidth />
            <Field
                component={TextField}
                type="text"
                label="Phone"
                name="contactPhone"
                fullWidth
            />

            <h2>Guest Info</h2>
            {values.guests.map((guest, i) => <GuestEditor guestNum={i} guest={guest} key={i} />)}
            <Button variant="outlined" onClick={() => {
                setFieldValue(`guests[${values.guests.length}]`, newGuest());
            }}>
                Add Guest
            </Button>
            <h2>Package Info</h2>
            <Field component={LabeledCheckbox}
                type="checkbox"
                label="Include Lift Tickets"
                name="includeLiftTickets"
            />
            <Field component={LabeledCheckbox}
                type="checkbox"
                label="Self Catered"
                name="selfCatered"
            />
            <Button
                variant='contained'
                color='primary'
                onClick={submitForm}>
                Submit
            </Button>
        </Form>}
    </Formik>;
}