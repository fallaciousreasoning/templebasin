import Head from "next/head";
import { AppBar, Toolbar, IconButton, makeStyles, Typography, Button, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
    title?: string;
    children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        maxWidth: '800px',
        margin: `${theme.spacing(1)}px auto`,
        padding: `${theme.spacing(1)}px`
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default (props: Props) => {
    const classes = useStyles();
    return <div className="layout">
        <Head>
            <title>{props.title}</title>
        </Head>
        <style jsx global>{`
            body {
            margin: 0px;
            }
        `}</style>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
        <Paper className={classes.content}>
            {props.children}
        </Paper>
    </div>;
}