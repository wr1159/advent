'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import axios from 'axios';

const INITIAL_DATA = {};
const PaymentPage = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [price, setPrice] = useState({});

  const fetchPrices = async () => {
    const { data } = await axios.get('/api/getproducts');
    setPrice(data[0]);
    console.log(data);
  };
  useEffect(() => {
    fetchPrices();
  }, []);
  const handleSubscription = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/payment',
        {
          priceId: price.id
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      window.location.assign(data);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="text-center">
        <h1 className="mb-6 font-sans text-4xl font-bold">
          Information recorded
        </h1>
        <p className="font-sans text-lg">
          Thank you for your interest. This event requires a registration fee.
        </p>
        <p className="mb-8 font-sans text-lg">
          You can proceed with payment using the button below or pay in person
          at the event.
        </p>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleSubscription}
            className="rounded-md bg-accent px-8 py-3 text-white shadow-md hover:bg-accentHover focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
