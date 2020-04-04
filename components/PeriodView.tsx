import moment, { Moment } from "moment";
import { useState, useMemo, useCallback } from "react";
import { ButtonGroup, Button } from "@material-ui/core";

type Period = "day" | "week" | "month" | "year";

interface Props {
    periods?: Period[];
    children?: (min: Moment, max: Moment) => React.ReactNode;
}

export default (props: Props) => {
    const possiblePeriods = props.periods || ['day', 'week', 'month', 'year'];

    const [date, setDate] = useState(moment());
    const [period, setPeriod] = useState<Period>("month");

    const nextPeriod = useCallback(() => setDate(moment(date).add(1, period)), [date, period]);
    const prevPeriod = useCallback(() => setDate(moment(date).subtract(1, period)), [date, period]);

    const from = useMemo(() => moment(date).startOf(period), [date, period]);
    const to = useMemo(() => moment(date).endOf(period), [date, period]);

    return <div>
    <ButtonGroup variant="contained" aria-label="contained primary button group">
        {possiblePeriods.map(p => <Button key={p} color={period === p ? "primary" : "default"} onClick={() => setPeriod(p)}>
            {p}
        </Button>)}
    </ButtonGroup>
    <ButtonGroup>
        <Button onClick={prevPeriod}>Prev</Button>
        <Button onClick={nextPeriod}>Next</Button>
    </ButtonGroup>
    {date.format('DD-MM-YYYY')}
    {props.children && props.children(from, to)}
    </div>
}