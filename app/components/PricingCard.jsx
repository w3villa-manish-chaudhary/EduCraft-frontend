'use client';

import React from 'react';
import '../components/Style/PricingCard.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PricingCard = ({ title, price, features, isBestForLearning, discount }) => {
    const makePayment = async () => {
        try {
            const details = {
                plan: title,
                price: price
            };

            console.table(details);

            const stripe = await stripePromise;

            if (!stripe) {
                console.error("Stripe has not been initialized");
                return;
            }

            const body = {
                product: {
                    plan: title,
                    price: price,
                }
            };

            const headers = {
                "Content-Type": "application/json"
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/payments`, { 
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            const session = await response.json();

            if (session.error) {
                console.error("Error creating checkout session:", session.error);
                return;
            }

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.error("Payment error:", result.error.message);
            }
        } catch (error) {
            console.error("Payment processing error:", error.message);
        }
    };

    return (
        <div className={`customcard3 ${isBestForLearning ? 'bg-primary text-white' : ''}`}>
            <div className=" mt-2 card-header text-center">
                {discount && <span className="discount-badge">{discount}% OFF</span>}
                <h4 className="my-0 font-weight-normal">{title}</h4>
                {isBestForLearning && <span className="most-popular-badge">Most Popular</span>}
                {isBestForLearning && <span className="best-for-learning-badge">Best for Learning</span>}
            </div>
            <hr></hr>

            <div className="card-body d-flex flex-column justify-content-between text-center">
                <div>
                    <h1 className="card-title pricing-card-title">
                        ₹{price} <small className="">/ year</small>
                    </h1>
                </div>
                <div>
                    <ul className="list-unstyled mt-3 mb-4">
                        {features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-lg btn-block btn-outline-dark"
                        onClick={makePayment}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
