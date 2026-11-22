/* eslint-disable */

import axios from 'axios';
const stripe = Stripe(
  'pk_test_51UbTTjJUpbJoXq5ZZUQUpy9oh0jvFIjfQDFUUUlnjZLLayluhIqVw5RriuHJ5j3DZJED8cRrLXFCJR3AkLFYBVWW00i3HKbOix',
);
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API

    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout from + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    const message =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Unable to start checkout. Please try again.';

    showAlert(
      'error',
      message,
    );
  }
};
