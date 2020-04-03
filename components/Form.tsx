import { Paper, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '800px',
      margin: `${theme.spacing(1)}px auto`,
      padding: `${theme.spacing(1)}px`
    },
  }));
  
export default (props: { children?: React.ReactNode }) => {
    const classes = useStyles();
    return <Paper className={classes.root}>
        <form autoComplete="on">
            {props.children}
        </form>
    </Paper>
}