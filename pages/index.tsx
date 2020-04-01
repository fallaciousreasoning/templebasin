import Head from 'next/head'
import { useEffect, useState } from 'react';
import { getBookings } from '../services/bookings';

const Home = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    getBookings().then(setData);
  }, []);

  return <div className="container">
    <Head>
      <title>Temple Basin Bookings</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {JSON.stringify(data)}
  </div>
}

export default Home
