import { FormControlLabel, Checkbox } from "@material-ui/core"
import { fieldToCheckbox, CheckboxWithLabelProps } from 'formik-material-ui'
import { useCallback, useMemo } from "react";
export default (props: CheckboxWithLabelProps & { label: string }) => {
    const {
        form: { setFieldValue },
        field: { name },
    } = props;

    const convertedProps = useMemo(() => fieldToCheckbox(props), [props]);

    return <FormControlLabel
        control={<Checkbox
            {...convertedProps} />}
        label={props.label} />
}