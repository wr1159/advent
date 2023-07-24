import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15'
  });
  let data = await request.json();
  console.log('data: ', data);
  let priceId = data.priceId;
  console.log('priceId: ', priceId);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'https://advent-beta.vercel.app',
    cancel_url: 'https://advent-beta.vercel.app'
  });

  return NextResponse.json(session.url);
}
