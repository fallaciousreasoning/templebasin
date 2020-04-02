import Head from 'next/head'
import Layout from '../components/Layout';
import BookingEditor from '../components/BookingEditor';
import { Paper, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { BookingInfo } from '../model/bookingInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    margin: `${theme.spacing(1)}px auto`,
    padding: `${theme.spacing(1)}px`
  },
}));

const Home = () => {
  const classes = useStyles();
  const [booking, setBooking] = useState<BookingInfo>({} as any);

  return <Layout title="Book">
    <Paper className={classes.root}>
      <form autoComplete="on">
        <BookingEditor booking={booking} onChanged={b => {setBooking(b); console.log(b)}} />
      </form>
    </Paper>
  </Layout>
}

export default Home
