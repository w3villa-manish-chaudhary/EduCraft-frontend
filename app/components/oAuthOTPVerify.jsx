'use client';
require('dotenv').config();
import React, { useState, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Style/otp.css';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const OauthOtpVerifyPage = ({ phoneNumber: initialPhone }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [phone, setPhone] = useState(initialPhone || '');
  const [error, setError] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const otpString = otp.join('');
    console.log('Submitting OTP:', otpString);

    if (!phone) {
      setError('Phone number is missing. Please go back and enter your phone number.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/otpverify`, { phone, otp: otpString });

      if (response.status === 200) {
        toast.success('OTP verified successfully.');
        // Redirect to dashboard
        window.location.href = '/';
      } else {
        setError('OTP verification failed.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred during OTP verification');
      } else if (error.request) {
        setError('No response received from server. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">OTP Verification</h2>
          <p className="text-center text-muted mb-4">Enter the OTP sent to your mobile: {phone}</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-center">
              <div className="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    ref={inputRefs[index]}
                    className="otp-box"
                  />
                ))}
              </div>
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button variant="primary" type="submit" className="verify-button w-100">
              Verify OTP
            </Button>
          </Form>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default OauthOtpVerifyPage;
