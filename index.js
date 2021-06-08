// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express(); 
const cors = require('cors')

const stripe = require('stripe')('sk_test_51IxciSKErirhniufS8YCZbUBG5JJVK70O3YG0CJICcwXB9W03FgMKFO0EA006XPi0mNeDDKak3luRbo65NuPCVQS00gnEFytpJ')

app.use(cors())

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success.html',
    cancel_url: 'http://localhost:3000/bokningar',
  });

  res.json({ id: session });
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));