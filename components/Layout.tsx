import Head from "next/head";
import { AppBar, Toolbar, IconButton, makeStyles, Typography, Button, Paper, Drawer, ListItem, List, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState, useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import Link from 'next/link';

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
                    <ListItem button>
                        <ListItemText primary={<Link href="/admin/overview">Overview</Link>}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Link href="/bookings">Bookings</Link>}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Link href="/bookings/book">New Booking</Link>}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Link href="/admin/lodges">Lodges</Link>}/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
        <Paper className={classes.content}>
            {props.children}
        </Paper>
    </div>;
}