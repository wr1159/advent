import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15'
  });
  const prices = await stripe.prices.list({
    limit: 1
  });
  return NextResponse.json(prices.data.reverse());
}

/*
const product = await stripe.products.create({
  name: 'event_name_variable + " Registration Fee"',
  default_price_data: {
    unit_amount: price_variable,
    currency: 'sgd',
  },
  expand: ['default_price'],
});
*/
