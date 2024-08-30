require('dotenv').config();
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsExclamationTriangleFill } from 'react-icons/bs';

const PaymentFailed = () => {
    return (
        <div className="container text-center mt-5">
            <h3>can't make any purchases</h3>
            <div className="mt-4">
                <div className="payment-failed-icon">
                    <BsExclamationTriangleFill size={50} color="red" />
                </div>
                <h3 className="mt-2">Payment Failed</h3>
            </div>
            <div className="mt-4 d-flex justify-content-center gap-2">
                <button href="/" className="btn btn-dark  mb-2">Cancel</button>
                <button className="btn btn-primary mb-2">Retry</button>
            </div>
            <p className="mt-3 text-muted">
                Something went wrong. Go back and review the sale information or cancel the sale.
            </p>
        </div>
    );
};

export default PaymentFailed;
