'use client'
require('dotenv').config();
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import Image from 'next/image';
import Img from '../../../public/login.jpg';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '@/Redux/features/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
        email,
        password
      });
      if (response.status === 200 || response.status === 201) {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);

        // Fetch user data
        const getUserData = async () => {
          try {
            const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
              headers: {
                'Authorization': `${localStorage.getItem('token')}`
              }
            });

            console.log('User data:', userResponse.data.user);
            localStorage.setItem('user', JSON.stringify(userResponse.data.user));
            dispatch(setUser(userResponse.data.user));
            
            toast.success("User login successfully")
            router.push('/courses');
          } catch (userError) {
            console.error('Failed to fetch user data:', userError.response?.data || userError.message);
            setError('Failed to fetch user profile. Please try again.');
          }
        };

        // Call the function to fetch user data
        getUserData();
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const googleClick = () => {
    const redirectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
    window.location.href = redirectUrl;
  };

  const githubClick = () => {
    const redirectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github`;
    window.location.href = redirectUrl;
  };

  return (
    <div className="login-container">
      <div className="login-img" style={{ height: "500px", flex: 1 }}>
        <Image
          src={Img}
          alt="login Illustration"
          placeholder="blur"
          className="login-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="login-form">
        <h3 className="text-centerheading">Sign In
          <span className='description'>
            <p>Sign In to access the world of courses! </p>
          </span>
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form className='form' onSubmit={handleSubmit}>
          <div className='inputs'>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link href="/forgotpass" className="btn btn-link forgot-password">Forgot password?</Link>
          </div>

          <div className='custom-btns'>
            <button type="submit" className="submit-btn btn btn-primary mb-3">Sign in</button>
            <div>
              <div className="or-divider">
                <hr className="line" />
                <span className="or-text">OR</span>
                <hr className="line" />
              </div>

              <div className='button-parents'>
                <button type="button" className="custom-button" onClick={googleClick}>
                  <FaGoogle className="mr-2" /> Login with Google
                </button>

                <button type="button" className="custom-button" onClick={githubClick}>
                  <FaGithub className="mr-2" /> Login with GitHub
                </button>
              </div>
            </div>

            <div className="text-center d-flex gap-1">
              <p className="mb-0">Don't have an account?</p>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
