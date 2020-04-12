import moment, { Moment } from "moment";
import { useState, useMemo, useCallback } from "react";
import { ButtonGroup, Button, makeStyles } from "@material-ui/core";
import { capitalize } from "../utils/string";

export type Period = "day" | "week" | "month" | "year";

interface Props {
    readonly periods?: Period[];
    defaultPeriod?: Period;

    children?: (min: Moment, max: Moment) => React.ReactNode;
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        flexWrap: 'wrap'
    },
    spacer: {
        flex: 1
    }
}));

export default (props: Props) => {
    const styles = useStyles();

    const possiblePeriods = props.periods || ['day', 'week', 'month', 'year'];
    const defaultPeriod = props.defaultPeriod || "month";
    if (!possiblePeriods.includes(defaultPeriod))
        throw new Error(`Period ${defaultPeriod} is not in ${JSON.stringify(possiblePeriods)} (try specifying a default period)`);

    const [date, setDate] = useState(moment());
    const [period, setPeriod] = useState<Period>(defaultPeriod);

    const nextPeriod = useCallback(() => setDate(moment(date).add(1, period)), [date, period]);
    const prevPeriod = useCallback(() => setDate(moment(date).subtract(1, period)), [date, period]);

    const from = useMemo(() => moment(date).startOf(period), [date, period]);
    const to = useMemo(() => moment(date).endOf(period), [date, period]);

    return <div>
        <div className={styles.container}>
            <div>
                <ButtonGroup>
                    <Button onClick={prevPeriod}>Prev</Button>
                    <Button onClick={nextPeriod}>Next</Button>
                </ButtonGroup>
            </div>
            <div className={styles.spacer} />
            <div>
                {capitalize(period)} of {date.format('DD-MM-YYYY')}
            </div>
            <div className={styles.spacer} />
            <div>
                {possiblePeriods.length !== 1 && <ButtonGroup variant="contained" aria-label="contained primary button group">
                    {possiblePeriods.map(p => <Button key={p} color={period === p ? "primary" : "default"} onClick={() => setPeriod(p)}>
                        {p}
                    </Button>)}
                </ButtonGroup>}
            </div>
        </div>
        {props.children && props.children(from, to)}
    </div>
}