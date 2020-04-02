import Head from 'next/head'
import Layout from '../components/Layout';
import BookingEditor from '../components/BookingEditor';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    margin: `${theme.spacing(1)}px auto`,
    padding: `${theme.spacing(1)}px`
  },
}));

const Home = () => {
  const classes = useStyles();
  return <Layout title="Book">
    <Paper className={classes.root}>
      <form autoComplete="on">
        <BookingEditor booking={{} as any} onChanged={console.log} />
      </form>
    </Paper>
  </Layout>
}

export default Home
