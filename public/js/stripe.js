/* eslint-disable */

import axios from 'axios';
const stripe = Stripe(
  'pk_test_51UbTQMJYP4YbePY2BU4fEAIQmO4s4TUTzQWF9MZr2FqPN5718MJG8vI3NRqcTWnBNy2u778sYnmI7e52gLJNhtQn00AjXURTYC',
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
    showAlert(
      'error',
      err.response?.data?.message ||
        'Unable to start checkout. Please try again.',
    );
  }
};
