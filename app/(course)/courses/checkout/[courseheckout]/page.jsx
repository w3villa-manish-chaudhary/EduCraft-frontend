"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import styles from './CheckoutPage.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutPage = ({ params }) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const uniqueId = params.courseheckout;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${uniqueId}`);
        setCourseData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course data');
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [params.courseheckout]);

  const makePayment = async () => {
    try {
      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe has not been initialized");
        return;
      }

      const body = {
        product: {
          plan: courseData.course_name,
          price: parseFloat(courseData.price),
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!courseData) return <div>No course data available</div>;

  return (
    <div className={styles.customContainer}>
      <h2 className={` text-center ${styles.customCardTitle} ${styles.customMarginBottom4}`}>Buy Course</h2>
      <div className={styles.customCard}>
        <div className={styles.customCardBody}>
          <h5 className={styles.customCardTitle}>{courseData.course_name}</h5>
          <p className={styles.customCardText}>{courseData.description}</p>
          <ul className={styles.customListGroup}>
            <li className={styles.customListGroupItem}><strong>Trainer:</strong> {courseData.trainer}</li>
            <li className={styles.customListGroupItem}><strong>Duration:</strong> {courseData.duration}</li>
            <li className={styles.customListGroupItem}><strong>Start Date:</strong> {new Date(courseData.start_date).toLocaleDateString()}</li>
            <li className={styles.customListGroupItem}><strong>End Date:</strong> {new Date(courseData.end_date).toLocaleDateString()}</li>
            <li className={styles.customListGroupItem}><strong>Category:</strong> {courseData.category}</li>
            <li className={styles.customListGroupItem}><strong>Rating:</strong> {courseData.rating} ({courseData.rating_count} ratings)</li>
          </ul>
          <div className={`${styles.customMarginTop3}`}>
            <span className={styles.customPriceOld}>${courseData.oldprice.toFixed(2)}</span>
            <span className={styles.customPriceNew}>${parseFloat(courseData.price).toFixed(2)}</span>
          </div>
          <button type="button" className={`${styles.customButton} ${styles.customButtonPrimary} ${styles.customWidth100} ${styles.customMarginTop3}`} onClick={makePayment}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
