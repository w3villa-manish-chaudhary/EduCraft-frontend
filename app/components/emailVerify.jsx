import React from 'react';

function EmailVerify() {
  const handleRedirect = () => {
    window.location.href = 'https://mail.google.com/mail/u/0/#inbox';
  };

  return (
    <div className="container mt-5 text-center">
      <div className="alert alert-info" role="alert">
        Please check your email and verify your account to complete the verification process.
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={handleRedirect}
      >
        Go to Gmail Inbox
      </button>
    </div>
  );
}

export default EmailVerify;
