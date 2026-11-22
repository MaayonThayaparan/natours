/* eslint-disable */

import axios from 'axios';
const stripe = Stripe(
  'pk_test_51UbTTjJUpbJoXq5ZZUQUpy9oh0jvFIjfQDFUUUlnjZLLayluhIqVw5RriuHJ5j3DZJED8cRrLXFCJR3AkLFYBVWW00i3HKbOix',
);
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API

    const session = await axios(
      `http://localhost:3000/api/v1/booking/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2) Create checkout from + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
