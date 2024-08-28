import React from 'react';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const testimonialsData = [
    {
      quote:
        "Your method is simple, straight to the point and I can practice with it everywhere, even from my phone, that's something I have never had in other learning platforms.",
      name: 'Felipe Matheus',
      title: 'Software Engineer',
    },

    {
      quote:
        'I highly recommend Educative. The courses are well organized and easy to understand. I find that with full video courses,it can passive learning mode.',
      name: 'Adina Ong',
      title: 'Senior Engineering Manager',
    },

    {
        quote:
          'I prefer Educative courses because they have a nice mix of text & images. I find that with full video courses, it can often be too easy to go into passive learning mode.',
        name: 'Clifford Fajardo',
        title: 'Senior Software Engineer',
      },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">What Our Learners Say</h2>
      <hr />
      <div className="row d-flex text-center justify-content-center gap-2">
        {testimonialsData.map((testimonial, index) => (
          <div className="col-md-4 " key={index}>
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
