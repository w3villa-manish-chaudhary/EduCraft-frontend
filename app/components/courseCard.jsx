import React from 'react';
import './Style/CardCourse.css';
import Image from 'next/image';
import Img from '../../public/p.jpg';

function CardCourse({ course }) {
  const rating = course.rating ? parseFloat(course.rating).toFixed(1) : '0.0';

  return (
    <div className="card">
      <div className="card-img">
        <Image src={Img} alt={`${course.course_name} image`} />
      </div>
      <div className="cardDetails">
        <div className="Heading">
          <h2>{course.course_name}</h2>
        </div>
        <div className="author">
          <p>{course.trainer}</p>
        </div>
        <div className="rating">
          <span>{rating}</span>
          <span>⭐</span>
          <span>({course.rating_count || 0})</span>
        </div>
        <div className="price">
          <span className="current-price">₹{course.price}</span>
          {course.oldprice && <span className="original-price">₹{course.oldprice}</span>}
        </div>
      </div>
    </div>
  );
}

export default CardCourse;
