import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import Image from 'next/image';
import Img from '../../../public/signup.jpg';
import Link from 'next/link';

const Signup = () => {
  return (
    <div className="signup-container mt-5">
      <div className="signup-form">
        <h3 className="text-centerheading">Sign Up
          <span className='description'>
            <p>Sign up to start your journey.</p>
          </span>
        </h3>

        <form className='form'>
          <div className='inputs'>
            <div className="form-group">
              <input type="text" className="form-control" id="name" placeholder="Name" autoComplete = "username" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" id="email" placeholder="Email" autoComplete = "email" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="phone" placeholder="Mobile Number" autoComplete = "phone-number" />
            </div>
            <div className="form-group">
              
              <input type="password" className="form-control" id="password" placeholder="Password" autoComplete = "new-password" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="confirm-password" placeholder="Confirm Password" autoComplete = "new-password" />
            </div>
          </div>

          <div className='custom-btns'>
            <button type="submit" className="submit-btn btn btn-primary mb-3">Sign up</button>

            <div className="text-center">
              <span>Already have account? </span>
              <Link href="/login">Sign In</Link>
            </div>
          </div>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="signup-img" style={{ height: "500px", flex: 1 }}>
        <Image
          src={Img}
          alt="signup Illustration"
          placeholder="blur"
          className="signup-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default Signup;