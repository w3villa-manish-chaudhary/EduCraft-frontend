import React from 'react';
import Link from 'next/link';
import './Style/Navbar.css';

const CustomNavbar = () => {
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
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link href="/" legacyBehavior>
                <a className="nav-link custom-class-navtext">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" legacyBehavior>
                <a className="nav-link custom-class-navtext">About</a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/login" legacyBehavior>
                <a className="nav-link custom-class-navtext">Sign In</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
