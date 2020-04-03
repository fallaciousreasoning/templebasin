import { Button, ButtonProps, CircularProgress } from "@material-ui/core"
import { useCallback, useState } from "react"

interface Props extends ButtonProps {
    onSubmit: () => Promise<any>;
}

export default (props: Props) => {
    const [submitting, setSubmitting] = useState(false);
    const onSubmit = useCallback(() => {
        setSubmitting(true);
        props.onSubmit().then(() => setSubmitting(false));
    }, [props.onSubmit]);

    return <Button {...props}
        variant={props.variant || 'contained'}
        color={props.color || 'primary'}
        onClick={onSubmit} disabled={submitting}>
        {submitting ? <CircularProgress size={24} /> : props.children}
    </Button>
}