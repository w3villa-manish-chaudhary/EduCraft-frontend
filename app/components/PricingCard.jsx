import React from 'react';

const PricingCard = ({ title, price, features, isPopular, isBestForLearning, discount }) => (
    <div className={`card ${isPopular ? 'border-primary' : ''} ${isBestForLearning ? 'bg-primary text-white' : ''}`}>

        <div className="card-header">
            <span className="">{discount}% OFF</span>
            <h4 className="my-0 font-weight-normal">{title}</h4>
            {isPopular && <span className="">Most Popular</span>}
            {isBestForLearning && <span className="">Best for Learning</span>}
        </div>

        <div className="card-body">
            <h1 className="card-title pricing-card-title">
                ₹{price} <small className="">/ year</small>
            </h1>
            <ul className="list-unstyled mt-3 mb-4">
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <button type="button" className="btn btn-lg btn-block btn-outline-dark">
                Get Started
            </button>

        </div>



    </div>
);

export default PricingCard;