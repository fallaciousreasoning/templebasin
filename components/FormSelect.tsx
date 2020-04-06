import { FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, SelectProps, Chip } from "@material-ui/core"
import { fieldToCheckbox, CheckboxWithLabelProps } from 'formik-material-ui'
import { useCallback, useMemo, useState } from "react";
import { useFormikContext } from "formik";

type Props ={
    values: string[];
    field: { name: string };
    label: string;
} & ({
    field: {
        value: string;
    }
    multiple: undefined | false;
} | {
    multple: true;
    field: { value: string[] }
})

let nextId: number;

const renderValue = (selected: string | string[]) => {
    selected = Array.isArray(selected) ? selected : [selected];
    return selected.join(', ');
}

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
                multiple={props.multiple}
                labelId={id}
                value={value}
                onChange={onChange}
                renderValue={renderValue}
            >
                {values.map(v => <MenuItem key={v} value={v}>
                    {v}
                </MenuItem>)}
            </Select>
        </FormControl>
    </div>
}