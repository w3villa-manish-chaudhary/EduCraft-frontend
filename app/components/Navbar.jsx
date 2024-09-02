'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '@/Redux/features/userSlice';
import './Style/Navbar.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.userSlice.user);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        dispatch(clearUser());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("User logged out successfully");
        router.push('/login');
      } else {
        console.error('Logout failed');
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-class-navbgcolor fixed-top">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center">
          <img src="/favicon.png" alt="favicon" width="25" height="25" className="mr-2 logo" />
          <span>
            <Link href="/" legacyBehavior>
              <a className="custom-class-navtext Logoname">EduCraft</a>
            </Link>
          </span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-between ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link href="/" legacyBehavior>
                <a className="nav-link custom-class-navtext">Home</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/courses" legacyBehavior>
                <a className="nav-link custom-class-navtext">Courses</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" legacyBehavior>
                <a className="nav-link custom-class-navtext">About</a>
              </Link>
            </li>


          </ul>
          <ul className="navbar-nav align-items-center">
            {user ? (
              <>
                <li className="nav-item dropdown" ref={dropdownRef}>
                  <div
                    className="nav-link custom-class-navtext user-avatar"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className='userName'>{user.name}</div>
                  </div>
                  {dropdownOpen && (
                    <div className="dropdown-menu show customdropdown">
                      <Link href="/profile" legacyBehavior>
                        <a className="dropdown-item userNameDrop">Profile</a>
                      </Link>
                      <a className="dropdown-item customlogout userNameDrop" onClick={handleSignOut}>Logout</a>
                    </div>
                  )}
                </li>
                <li className="nav-item ml-2">
                  <Link href="/checkout" legacyBehavior>
                    <a className="nav-link custom-class-navtext">
                      <i className="fas fa-shopping-cart bold"></i>
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login" legacyBehavior>
                  <a className="nav-link custom-class-navtext">Sign In</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
