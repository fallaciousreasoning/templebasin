import Head from 'next/head'
import { useEffect, useState } from 'react';
import { getBookings } from '../services/bookings';
import Layout from '../components/Layout';

const Home = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    getBookings().then(setData);
  }, []);

  return <Layout title="Book">
    {JSON.stringify(data)}
  </Layout>
}

export default Home
