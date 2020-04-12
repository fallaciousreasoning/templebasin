import Head from "next/head";
import { AppBar, Toolbar, IconButton, makeStyles, Typography, Button, Paper, Drawer, ListItem, List, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState, useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import ListItemLink from "./ListItemLink";

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
    drawer: {
        width: 250
    }
}));

export default (props: Props) => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = useCallback(() => {
        setDrawerOpen(!drawerOpen);
    }, [drawerOpen]);
    
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
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <div className={classes.drawer}>
                <List>
                    <ListItemLink href="/admin/overview">
                        <ListItemText primary="Overview"/>
                    </ListItemLink>
                    <ListItemLink href="/admin/beds">
                        <ListItemText primary="Beds"/>
                    </ListItemLink>
                    <ListItemLink href="/admin/lodges">
                        <ListItemText primary="Lodges"/>
                    </ListItemLink>
                    <ListItemLink href="/bookings">
                        <ListItemText primary="Bookings"/>
                    </ListItemLink>
                    <ListItemLink href="/bookings/book">
                        <ListItemText primary="New Booking"/>
                    </ListItemLink>
                </List>
            </div>
        </Drawer>
        <Paper className={classes.content}>
            {props.children}
        </Paper>
    </div>;
}