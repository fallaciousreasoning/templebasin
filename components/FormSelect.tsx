import { FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, SelectProps } from "@material-ui/core"
import { fieldToCheckbox, CheckboxWithLabelProps } from 'formik-material-ui'
import { useCallback, useMemo, useState } from "react";
import { useFormikContext } from "formik";

interface Props {
    values: string[];
    field: {
        name: string;
        value: string;
    }
    label: string;
}

let nextId: number;

export default (props: Props & SelectProps) => {
    const { values, field: { name, value }, label, ...other } = props;
    const [id] = useState("label-" + nextId++);
    const context = useFormikContext();

    const onChange = useCallback((e) => {
        context.setFieldValue(name, e.target.value);
    }, [name]);

    return <div>
        <FormControl fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                {...other}
                labelId={id}
                value={value}
                onChange={onChange}
            >
                {values.map(v => <MenuItem key={v} value={v}>
                    {v}
                </MenuItem>)}
            </Select>
        </FormControl>
    </div>
}