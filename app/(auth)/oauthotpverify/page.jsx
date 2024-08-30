'use client'
require('dotenv').config();
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OauthOtpVerifyPage from '../../components/oAuthOTPVerify'

const OtpVerifyPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [otpsend, setOtpsend] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/oauthotpsend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      const data = await response.json();
      toast.success(data.message || 'OTP sent successfully');
      setOtpsend(true);
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
      toast.error('Failed to send OTP. Please try again.');
      console.error('Error:', error);
    }
  };



  if (otpsend) {
    return <OauthOtpVerifyPage phoneNumber ={phoneNumber} />;
  }


  return (
    <>
    

    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Enter the mobile number for verification</h2>
          <Form onSubmit={handleSubmit}>
            <div className='mid'>
              <Form.Group className="mb-3">
                <Form.Control
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                  className="smallInput"
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button variant="primary" type="submit" className="w-100 smallButton">
                Send OTP
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
    </>
  );
};

export default OtpVerifyPage;
