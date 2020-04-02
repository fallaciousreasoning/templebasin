import { Guest } from "../model/guest"
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControlLabel } from "@material-ui/core";

interface Props {
    guest: Guest;
    onChanged: (guest: Guest) => void;
}

export default (props: Props) => {
    return <>
        <TextField label="First Name" fullWidth required />
        <TextField label="Last Name" fullWidth required />
        <TextField label="Email" fullWidth required />
        <TextField label="Phone" fullWidth required />
        <TextField
            id="date"
            label="Date of Birth"
            type="date"
            required
            InputLabelProps={{
                shrink: true,
            }}
        />
        <div>
            <FormControlLabel
                control={<Checkbox name="member"/>}
                label="Temple Basin Member" />
        </div>
        <div>
            <FormControlLabel
                control={<Checkbox name="member"/>}
                label="Student" />
        </div>
    </>
}