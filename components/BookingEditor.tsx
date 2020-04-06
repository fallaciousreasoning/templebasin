import { Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField } from 'formik-material-ui';
import { BookingInfo, bookingSchema } from "../model/bookingInfo";
import LabeledCheckbox from "./LabeledCheckbox";
import { useCallback } from "react";

interface Props {
    initialValue: BookingInfo;
    onSubmit: (booking: BookingInfo) => Promise<any>;
}

export default (props: Props) => {
    const submit = useCallback(async (value, {setSubmitting}) => {
        await props.onSubmit(value);
        setSubmitting(false);
    }, [props.onSubmit]);
    return <Formik
        initialValues={props.initialValue}
        validationSchema={bookingSchema}
        validateOnChange
        validateOnBlur
        onSubmit={submit}>
        {({ submitForm, isSubmitting }) => <Form>
            <Field
                component={TextField}
                name="owner.firstName"
                type="text"
                label="First Name"
                fullWidth
            />
            <Field
                component={TextField}
                type="text"
                label="Last Name"
                name="owner.lastName"
                fullWidth
            />

            <Field
                component={TextField}
                type="email"
                label="Email"
                name="owner.email"
                fullWidth />

            <Field
                component={TextField}
                type="text"
                label="Phone"
                name="owner.phone"
                fullWidth
            />

            <Field
                component={TextField}
                type="date"
                label="Date of Birth"
                name="owner.dateOfBirth"
                fullWidth
            />

            <Field
                component={LabeledCheckbox}
                type="checkbox"
                label="Temple Basin Member"
                name="owner.member" />
            <Field
                component={LabeledCheckbox}
                type="checkbox"
                label="Student"
                name="owner.student" />

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