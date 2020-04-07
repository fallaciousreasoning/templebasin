import { makeStyles } from "@material-ui/core"

interface Props {
    children: React.ReactNode;
    position?: 'top' | 'bottom';
}

const useStyles = makeStyles((theme) => ({
    sticky: {
        position: 'sticky',
        top: props => (props['position'] === undefined || props['position'] === 'top') ? 0 : undefined,
        bottom: props => props['position'] === 'bottom' ? 0 : undefined,
        zIndex: 1000,
    }
}));

export default (props: { children: React.ReactNode, position?: 'top' | 'bottom' }) => {
    const styles = useStyles(props);
    return <div className={styles.sticky}>
        {props.children}
    </div>
}