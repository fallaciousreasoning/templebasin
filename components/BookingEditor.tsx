import { Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField } from 'formik-material-ui';
import { BookingInfo, bookingSchema } from "../model/bookingInfo";
import LabeledCheckbox from "./LabeledCheckbox";

interface Props {
    booking: BookingInfo;
    onChanged: (booking: BookingInfo) => void;
}

export default (props: Props) => {
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

            <div>
                <Field component={LabeledCheckbox}
                    type="checkbox"
                    label="Include Lift Tickets"
                    name="includeLiftTickets"
                />
            </div>
            <div>
                <Field component={LabeledCheckbox}
                    type="checkbox"
                    label="Self Catered"
                    name="selfCatered"
                />
            </div>
            <Button
                variant='contained'
                color='primary'
                onClick={submitForm}>
                Submit
            </Button>
        </Form>}
    </Formik>;
}