import React from 'react';

const TestimonialCard = ({ quote, name, title}) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body shadow-lg ">
        <blockquote className="mb-0">
          <p className="mb-3">
            <i className="fas fa-quote-left text-primary"></i> {quote}
          </p>
          <footer className="blockquote-footer">
            <div className="d-flex align-items-center">
              <div>
                <h6 className="mb-0 mt-2 text-dark">{name}</h6>
                <p className="small text-muted mb-0">{title}</p>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default TestimonialCard;
