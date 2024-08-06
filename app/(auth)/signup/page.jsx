"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import Image from 'next/image';
import Img from '../../../public/signup.jpg';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import OtpVerifyPage from '../../components/otpVerify'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        toast.success('Signup successful! Please verify your OTP');
        console.log('User created:', response.data);
        localStorage.setItem('token', response.data.token);
        setShowOtp(true);
      } else {
        throw new Error('Signup failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        const serverError = error.response.data.message;
        if (serverError.includes('email')) {
          setErrors(prevErrors => ({ ...prevErrors, email: 'Email already registered' }));
        } else if (serverError.includes('phone')) {
          setErrors(prevErrors => ({ ...prevErrors, phone: 'Phone number already registered' }));
        } else {
          setErrors(prevErrors => ({ ...prevErrors, server: serverError }));
        }
      } else {
        setErrors(prevErrors => ({ ...prevErrors, server: 'An error occurred during signup. Please try again.' }));
      }
    }
  };

  return (
    <>
      {showOtp ? (
        <OtpVerifyPage phone={formData.phone} />
      ) : (
        <div className="signup-container mt-5">
          <div className="signup-form">
            <h3 className="text-centerheading">Sign Up
              <span className='description'>
                <p>Sign up to start your journey.</p>
              </span>
            </h3>

            <form className='form' onSubmit={handleSubmit}>
              <div className='inputs'>
                {errors.server && <div className="alert alert-danger">{errors.server}</div>}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="phone-number"
                  />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </div>
              </div>

              <div className='custom-btns'>
                <button type="submit" className="submit-btn btn btn-primary mb-3">Sign up</button>

                <div className="text-center">
                  <span>Already have an account? </span>
                  <Link href="/login">Sign In</Link>
                </div>
              </div>
            </form>
          </div>

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
      )}
    </>
  );
};

export default Signup;