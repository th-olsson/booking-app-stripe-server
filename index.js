require('dotenv').config()

const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;

const express = require('express');
const app = express(); 
const cors = require('cors')
const bodyParser = require('body-parser')

const stripe = require('stripe')('sk_test_51IxciSKErirhniufS8YCZbUBG5JJVK70O3YG0CJICcwXB9W03FgMKFO0EA006XPi0mNeDDKak3luRbo65NuPCVQS00gnEFytpJ')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'sek',
          product_data: {
            name: 'Bokningar',
          },
          unit_amount: req.body.price * 100,
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