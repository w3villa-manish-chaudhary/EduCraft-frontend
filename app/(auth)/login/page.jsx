'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import Image from 'next/image';
import Img from '../../../public/login.jpg';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/signin', {
        email,
        password
      });
      if (response.status === 200 || response.status === 201) {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        router.push('/home');
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container mt-5">
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
                <button type="button" className="custom-button">
                  <FaGoogle className="mr-2" /> Login with Google
                </button>

                <button type="button" className="custom-button">
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