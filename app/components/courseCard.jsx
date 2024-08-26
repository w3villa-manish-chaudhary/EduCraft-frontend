import React from 'react';
import './Style/CardCourse.css';

function CardCourse({ course }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src="https://picsum.photos/268/149" alt="img" />
      </div>
      <div className="cardDetails">
        <div className="Heading">
          <h2>{course.course_name}</h2>
        </div>
        <div className="author">
          <p>{course.trainer}</p>
        </div>
        <div className="rating">
          <span>{course.rating}</span>
          <span>⭐</span>
          <span>({course.rating_count})</span>
        </div>
        <div className="price">
          <span className="current-price">${course.price}</span>
          {course.oldprice && <span className="original-price">${course.oldprice}</span>}
        </div>
      </div>
    </div>
  );
}

export default CardCourse;
