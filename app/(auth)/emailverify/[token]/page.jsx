'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const EmailVerify = ({ params }) => {
  const { token } = params;
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState('pending');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/emailverify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          setTimeout(() => router.push('/'), 2000);
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
          <h2 className="mb-4">Email Verification</h2>
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
                Your email has been successfully verified. You will be redirected to the homepage shortly.
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