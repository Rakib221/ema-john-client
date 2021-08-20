import React from 'react';
import { Elements,  CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
const stripePromise = loadStripe('pk_test_51JQBZIKJerLWy3FFvjA3KaatG2GJQocwGrmkVefC1mVVbNh0LtEEXNjTVkMQmilOhgJJlU1xIZWjSkHz9FZ4aAdh00fnHh9Vqj');

const processPayment = () => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm></SimpleCardForm>
        </Elements>
    );
};

export default processPayment;