'use client';
require('dotenv').config();
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EmailVerify = ({ params }) => {
  const { token } = params;
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const toastShown = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/emailverify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          if (!toastShown.current) {
            toast.success("User created successfully, please login!");
            toastShown.current = true;
          }
          setTimeout(() => router.push('/login'), 3000);
        } else {
          setVerificationStatus('error');
          console.error(result.message);
        }
      } catch (error) {
        setVerificationStatus('error');
        console.error('Error verifying email:', error);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h2 className="mb-5">Email Verification</h2>
          {verificationStatus === 'pending' && (
            <>
              <Spinner animation="border" role="status" className="mb-3">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p>Verifying your email... Please wait.</p>
            </>
          )}
          {verificationStatus === 'success' && (
            <Alert variant="success">
              <Alert.Heading>Verification Completed!</Alert.Heading>
              <p>
                Your email has been successfully verified. You will be redirected to the login page shortly.
              </p>
            </Alert>
          )}
          {verificationStatus === 'error' && (
            <Alert variant="danger">
              <Alert.Heading>Verification Failed</Alert.Heading>
              <p>
                We couldn't verify your email. Please try again or contact support.
              </p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EmailVerify;
