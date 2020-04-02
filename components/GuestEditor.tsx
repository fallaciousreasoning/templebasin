import { Guest } from "../model/guest"
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControlLabel } from "@material-ui/core";
import PropertyEditor from "./PropertyEditor";

interface Props {
    guest: Guest;
    onChanged: (guest: Guest) => void;
}

export default (props: Props) => {
    return <>
        <PropertyEditor
            type="text"
            label="First Name"
            onChange={props.onChanged}
            value={props.guest}
            propertyName="firstName"
            required />
        <PropertyEditor
            type="text"
            label="Last Name"
            onChange={props.onChanged}
            value={props.guest}
            propertyName="lastName"
            required />


        <PropertyEditor
            type="text"
            label="Email"
            onChange={props.onChanged}
            value={props.guest}
            propertyName="email"
            required />
        <PropertyEditor
            type="text"
            label="Phone"
            onChange={props.onChanged}
            value={props.guest}
            propertyName="phone"
            required />

        <PropertyEditor
            type="date"
            label="Date of Birth"
            onChange={props.onChanged}
            value={props.guest}
            propertyName="dateOfBirth"
            required />

        <PropertyEditor
            type="check"
            label="Temple Basin Member"
            onChange={props.onChanged}
            value={props.guest}
            propertyName="member" />
        <PropertyEditor
            type="check"
            label="Student"
            onChange={props.onChanged}
            value={props.guest}
            propertyName="student" />
    </>
}