import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    sticky: {
        position: 'sticky',
        top: 0
    }
}));

export default (props: { children: React.ReactNode }) => {
    const styles = useStyles();
    return <div className={styles.sticky}>
        {props.children}
    </div>
}