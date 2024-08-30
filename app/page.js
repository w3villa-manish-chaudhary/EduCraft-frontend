import React from 'react';
import PricingSection from '@/app/components/PricingSection';
import "./homepage.css";
import Testimonials from '@/app/components/Testimonials';

const HomePage = () => (
  <div className='main-container'>
    <div className='mainheading'>
      <h1 className='subheading fw-bold text-center m-auto'>Level up your learning. Level up your career.</h1>
    </div>
    <div className='features m-auto'>
      <span className='col-md-4'><i className="fa-brands fa-readme"></i> 100+ Courses</span>
      <span className='col-md-4'><i className="fa-solid fa-users"></i> 100+ Learners</span>
      <span className='col-md-4'><i className="fa-solid fa-microchip"></i> AI-Powered Learning</span>
    </div>
    <PricingSection />
    <section className="features-section">
      <h2 className="text-gray fw-bold text-center mt-3">Why EduCraft?</h2>
      <hr />
      <div className="features-grid">
        <div className="feature-card">
          <i className="fa-solid fa-chalkboard"></i>
          <h3 className="feature-title">Learn Interactively</h3>
          <p className="feature-description">
            Our courses include built-in coding playgrounds that let you learn new things without any setup.
          </p>
        </div>
        <div className="feature-card">
          <i className="fa-solid fa-book-atlas"></i>
          <h3 className="feature-title">Learn Faster</h3>
          <p className="feature-description">
            All of our learning products are text-based. You get to learn at your own pace. No pauses.
          </p>
        </div>
        <div className="feature-card">
          <i className="fa-solid fa-section"></i>
          <h3 className="feature-title">Personalize Your Learning</h3>
          <p className="feature-description">
            Achieve your goals faster with a path designed just for you. Personalized Paths are customized and focused on your individual learning needs and career goals.
          </p>
          <span className="premium-badge">PREMIUM</span>
        </div>
        <div className="feature-card">
          <i className="fa-solid fa-puzzle-piece"></i>
          <h3 className="feature-title">Build Real-World Projects</h3>
          <p className="feature-description">
            Complete a real-world programming project designed to exercise practical skills used in the workplace. Everything you learn from a Project will help you practice skills that are in-demand, useful, and highly relevant.
          </p>
          <span className="premium-badge">PREMIUM</span>
        </div>
      </div>
      <Testimonials />
    </section>
  </div>
);

export default HomePage;
