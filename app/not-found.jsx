import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Img from '../public/4O4.jpg';

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <div className="img-container mb-4">
        <Image 
          src={Img} 
          alt="Page Not Found Illustration" 
          width={300} 
          height={300} 
          placeholder="blur" 
          className="img-fluid rounded shadow-lg"
          style={{ 
            border: '1px solid rgba(0, 0, 0, 0.2)',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
      <h1 className="display-4 mb-3">Oops! Page Not Found</h1>
      <p className="lead mb-4">The page you're looking for doesn't exist or has been removed.</p>
      <Link href="/" className="btn btn-success">Go to Home</Link>
    </div>
  );
}

export default NotFound;