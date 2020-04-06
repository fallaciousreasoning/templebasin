import { Guest } from "../model/guest"
import { Checkbox, FormControlLabel } from "@material-ui/core";
import PropertyEditor from "./PropertyEditor";
import { useCallback } from "react";
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

interface Props {
    submitForm: () => void;
    submitting: boolean;
}

export default (props: Props) => {
    return <>
        <Field
            component={TextField}
            name="firstName"
            type="text"
            label="First Name"
        />
        <Field
            component={TextField}
            type="text"
            label="Last Name"
            name="lastName"
        />

        <Field
            component={TextField}
            type="email"
            label="Email"
            name="email" />

        <Field
            component={TextField}
            type="text"
            label="Phone"
            name="phone"
        />

        <Field
            component={TextField}
            type="date"
            label="Date of Birth"
            name="dateOfBirth"
        />

        <Field
            component={Checkbox}
            type="checkbox"
            label="Temple Basin Member"
            name="member" />
        <Field
            component={Checkbox}
            type="checkbox"
            label="Student"
            name="student" />
    </>;
}