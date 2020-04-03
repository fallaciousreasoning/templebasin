import { Guest } from "../model/guest"
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControlLabel } from "@material-ui/core";
import PropertyEditor from "./PropertyEditor";
import { useCallback } from "react";

interface Props {
    guest: Guest;
    onChanged: (guest: Guest) => void;
}

export default (props: Props) => {
    const onChanged = useCallback(update => {
        props.onChanged({ ...props.guest, ...update });
    }, [props.guest, props.onChanged]);

    return <>
        <PropertyEditor
            type="text"
            label="First Name"
            onChange={onChanged}
            value={props.guest}
            propertyName="firstName"
            required />
        <PropertyEditor
            type="text"
            label="Last Name"
            onChange={onChanged}
            value={props.guest}
            propertyName="lastName"
            required />


        <PropertyEditor
            type="text"
            label="Email"
            onChange={onChanged}
            value={props.guest}
            propertyName="email"
            required />
        <PropertyEditor
            type="text"
            label="Phone"
            onChange={onChanged}
            value={props.guest}
            propertyName="phone"
            required />

        <PropertyEditor
            type="date"
            label="Date of Birth"
            onChange={onChanged}
            value={props.guest}
            propertyName="dateOfBirth"
            required />

        <PropertyEditor
            type="check"
            label="Temple Basin Member"
            onChange={onChanged}
            value={props.guest}
            propertyName="member" />
        <PropertyEditor
            type="check"
            label="Student"
            onChange={onChanged}
            value={props.guest}
            propertyName="student" />
    </>
}