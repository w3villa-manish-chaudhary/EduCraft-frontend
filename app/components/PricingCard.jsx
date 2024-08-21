import React from 'react';
import  '../components/Style/PricingCard.css'

const PricingCard = ({ title, price, features, isBestForLearning, discount }) => (
    <div className= {` card customcard ${isBestForLearning ? 'bg-primary text-white' : ''}`}>

        <div className="card-header">
            <span className="">{discount}% OFF</span>
            <h4 className="my-0 font-weight-normal">{title}</h4>
            <span className="">Most Popular</span>
            {isBestForLearning && <span className="">Best for Learning</span>}
        </div>

        <div className="card-body d-flex flex-column justify-content-between">
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

            <div>
            <button
                type="button"
                className="btn btn-lg btn-block btn-outline-dark">
                Get Started
            </button>

            </div>

        </div>
    </div>
);

export default PricingCard;
