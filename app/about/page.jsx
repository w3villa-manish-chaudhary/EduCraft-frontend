'use client'
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">About EduCraft</h1>
      
      <section className="mb-5">
        <h2>Our Story</h2>
        <p>
          EduCraft was founded in 2024 with a simple yet powerful mission: to make high-quality tech education accessible to everyone. 
          Our founders, a group of passionate educators and tech professionals, recognized the growing gap between traditional education 
          and the rapidly evolving needs of the tech industry.
        </p>
        <p>
          We started with a handful of courses and a small but dedicated team. Today, we're proud to have helped over 100,000 learners 
          from around the world advance their careers in tech.
        </p>
      </section>

      <section className="mb-5">
        <h2>Our Mission</h2>
        <p>
          At EduCraft, our mission is to empower individuals to learn in-demand tech skills in half the time of traditional methods. 
          We believe that education should be:
        </p>
        <ul>
          <li>Accessible: Available to anyone, anywhere, at any time</li>
          <li>Practical: Focused on real-world skills that employers value</li>
          <li>Efficient: Designed for rapid learning and immediate application</li>
          <li>Personalized: Tailored to each learner's unique goals and pace</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2>What Sets Us Apart</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h3>Interactive Learning</h3>
            <p>Our courses feature built-in coding environments, allowing you to practice as you learn without any setup.</p>
          </div>
          <div className="col-md-6 mb-4">
            <h3>AI-Powered Personalization</h3>
            <p>We use cutting-edge AI to customize learning paths and provide targeted recommendations for each student.</p>
          </div>
          <div className="col-md-6 mb-4">
            <h3>Industry-Relevant Content</h3>
            <p>Our curriculum is constantly updated to reflect the latest trends and technologies in the tech industry.</p>
          </div>
          <div className="col-md-6 mb-4">
            <h3>Community-Driven</h3>
            <p>Join a vibrant community of learners and industry professionals to network and grow together.</p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2>Our Team</h2>
        <p>
          EduCraft is powered by a diverse team of educators, technologists, and industry experts. Our team members come from 
          leading tech companies and educational institutions, bringing a wealth of real-world experience to our platform.
        </p>
      </section>

      <section className="mb-5">
        <h2>Our Impact</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <h3>100,000+</h3>
            <p>Learners Worldwide</p>
          </div>
          <div className="col-md-4 mb-4">
            <h3>500+</h3>
            <p>Courses & Projects</p>
          </div>
          <div className="col-md-4 mb-4">
            <h3>95%</h3>
            <p>Learner Satisfaction Rate</p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2>Join Us in Shaping the Future of Tech Education</h2>
        <p>
          Whether you're just starting your journey in tech or looking to level up your skills, EduCraft is here to support you 
          every step of the way. Join our community today and be part of the future of tech education.
        </p>
        <div className="text-center">
          <a href="/" className="btn btn-primary btn-lg">Explore Our Courses</a>
        </div>
      </section>

      <style jsx>{`
        .container {
          max-width: 1200px;
          padding: 15px;
          margin: auto;
        }
        h1, h2 {
          font-family: 'Roboto', sans-serif;
          color: #333;
          font-weight: 700;
        }
        h1 {
          font-size: 2.5rem;
        }
        h2 {
          font-size: 2rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        p, ul {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.6;
        }
        section {
          padding: 2rem 0;
          border-bottom: 1px solid #ddd;
        }
        ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .row.text-center h3 {
          font-size: 2.5rem;
          color: #007bff;
          margin-bottom: 0.5rem;
        }
        .row.text-center p {
          font-size: 1.2rem;
          color: #555;
        }
        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
          font-size: 1.2rem;
          padding: 0.8rem 2rem;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
        @media (max-width: 768px) {
          h1, h2 {
            font-size: 1.8rem;
          }
          .col-md-6 {
            margin-bottom: 1.5rem;
          }
          .btn-primary {
            font-size: 1rem;
            padding: 0.6rem 1.5rem;
          }
        }
        @media (max-width: 576px) {
          h1, h2 {
            font-size: 1.5rem;
          }
          p, ul {
            font-size: 1rem;
          }
          .btn-primary {
            font-size: 0.9rem;
            padding: 0.5rem 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
