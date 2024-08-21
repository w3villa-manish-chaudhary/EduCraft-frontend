import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase mb-4">
              EduCraft
            </h5>
            <p>Learn in-demand tech skills in half the time</p>
          </div>

     
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase mb-4">Products</h5>
            <ul className="list-unstyled">
              <li className="mb-2">Mock Interview <span className="badge bg-primary">New</span></li>
              <li className="mb-2">Courses</li>
              <li className="mb-2">Cloud Labs</li>
              <li className="mb-2">Skill Paths</li>
              <li className="mb-2">Projects</li>
              <li className="mb-2">Assessments</li>
            </ul>
          </div>

     
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase mb-4">Trending Topics</h5>
            <ul className="list-unstyled">
              <li className="mb-2">Learn to Code</li>
              <li className="mb-2">Tech Interview Prep</li>
              <li className="mb-2">Generative AI</li>
              <li className="mb-2">Data Science</li>
              <li className="mb-2">Machine Learning</li>
              <li className="mb-2">GitHub Students Scholarship</li>
              <li className="mb-2">Early Access Courses</li>
            </ul>
          </div>

    
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase mb-4">Pricing</h5>
            <ul className="list-unstyled">
              <li className="mb-2">For Individuals</li>
              <li className="mb-2">Try for Free</li>
              <li className="mb-2">Gift a Subscription</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  // <h1>hello this is footer</h1>

  );
};

export default Footer;
