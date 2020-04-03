import { FormControlLabel, Checkbox, TextField } from "@material-ui/core";
import { useState, useEffect, useCallback } from "react";

type Props<K extends keyof T & string, T> = {
    label: string;
    propertyName: K;
    required?: boolean;

    value: T;
    onChange: (newValue: T) => void;

    validate?: (potentialValue: T[K]) => string[] | boolean;
} & ({ type: 'text' } | { type: 'date' } | { type: 'check' });

export default <K extends keyof T & string, T>(props: Props<K, T>) => {
    const [value, setValue] = useState(props.value[props.propertyName]);
    useEffect(() => {
        setValue(props.value[props.propertyName]);
    }, [props.value, props.propertyName]);

    const [errors, setErrors] = useState([]);

    const onChanged = useCallback(value => {
        setValue(value);

        let isValid: string[] | boolean = true;
        if (props.validate)
            isValid = props.validate(value);

        if (typeof isValid === 'boolean')
            setErrors(!isValid ? ['Invalid Value!'] : []);
        else setErrors(isValid);

        if (isValid === true || Array.isArray(isValid) && isValid.length === 0)
            props.onChange({ ...props.value, [props.propertyName]: value });
    }, [props.propertyName, props.value, value])

    let contents: JSX.Element;
    switch (props.type) {
        case "check":
            contents = <FormControlLabel
                control={<Checkbox
                    checked={!!value}
                    name={props.propertyName}
                    onChange={e => onChanged(e.target.checked)} />}
                label={props.label} />
            break;
        case "text":
            contents = <TextField
                error={!!errors.length}
                value={value as any || ""}
                onChange={e => onChanged(e.target.value)}
                label={props.label}
                name={props.propertyName} />
            break;
        case "date":
            contents = <TextField value={value as any || ""}
                error={!!errors.length}
                onChange={e => onChanged(e.target.value)}
                label={props.label} name={props.propertyName}
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}/>
            break;
    }

    return <div>
        {contents}
    </div>;
}