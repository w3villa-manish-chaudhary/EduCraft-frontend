// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './signup.css';
// import Image from 'next/image';
// import Img from '../../../public/signup.jpg';
// import Link from 'next/link';

// const Signup = () => {
//   return (
//     <div className="signup-container mt-5">
//       <div className="signup-form">
//         <h3 className="text-centerheading">Sign Up
//           <span className='description'>
//             <p>Sign up to start your journey.</p>
//           </span>
//         </h3>

//         <form className='form'>
//           <div className='inputs'>
//             <div className="form-group">
//               <input type="text" className="form-control" id="name" placeholder="Name" autoComplete = "username" />
//             </div>
//             <div className="form-group">
//               <input type="email" className="form-control" id="email" placeholder="Email" autoComplete = "email" />
//             </div>
//             <div className="form-group">
//               <input type="text" className="form-control" id="phone" placeholder="Mobile Number" autoComplete = "phone-number" />
//             </div>
//             <div className="form-group">

//               <input type="password" className="form-control" id="password" placeholder="Password" autoComplete = "new-password" />
//             </div>
//             <div className="form-group">
//               <input type="password" className="form-control" id="confirm-password" placeholder="Confirm Password" autoComplete = "new-password" />
//             </div>
//           </div>

//           <div className='custom-btns'>
//             <button type="submit" className="submit-btn btn btn-primary mb-3">Sign up</button>

//             <div className="text-center">
//               <span>Already have account? </span>
//               <Link href="/login">Sign In</Link>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Right Side Image */}
//       <div className="signup-img" style={{ height: "500px", flex: 1 }}>
//         <Image
//           src={Img}
//           alt="signup Illustration"
//           placeholder="blur"
//           className="signup-image"
//           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Signup;



"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import Image from 'next/image';
import Img from '../../../public/signup.jpg';
import Link from 'next/link';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
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
        alert('Signup successful!');
        console.log('User created:', response.data);

        // Store JWT token in localStorage
        localStorage.setItem('token', response.data.token);

        // Redirect or clear the form as needed
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        throw new Error('Signup failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error during signup.');
    }
  };

  return (
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
