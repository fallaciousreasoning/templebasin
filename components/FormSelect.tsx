import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@material-ui/core";
import { useFormikContext } from "formik";
import { useCallback, useState } from "react";
import React from "react";

type Props = {
    values: string[];
    field: { name: string };
    label: string;
    renderOption?: (option: string) => React.ReactNode;
    renderValue?: (value: string | string[]) => React.ReactNode;
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

const defaultRenderValue = (selected: string | string[]) => {
    selected = Array.isArray(selected) ? selected : [selected];
    return selected.join(', ');
}

const defaultRenderOption = (option: string) => <MenuItem value={option}>
    {option}
</MenuItem>;

export default (props: Props & SelectProps) => {
    const { values, field: { name, value }, label, ...other } = props;
    const [id] = useState("label-" + nextId++);
    const context = useFormikContext();

    const onChange = useCallback((e) => {
        context.setFieldValue(name, e.target.value);
    }, [name]);

    const renderValue = props.renderValue || defaultRenderValue;
    const renderOption = props.renderOption || defaultRenderOption;

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
                disabled={props.disabled || context.isSubmitting}>
                {values.map(option => <React.Fragment key={option}>{renderOption(option)}</React.Fragment>)}
            </Select>
        </FormControl>
    </div>
}