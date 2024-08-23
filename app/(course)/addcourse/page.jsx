'use client';
require('dotenv').config();
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddCourseForm.css';

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    course_name: '',
    description: '',
    duration: '',
    start_date: '',
    end_date: '',
    category: '',
    price: '',
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/addcourse`, formData);
      toast.success(response.data.message);
      setFormData({
        course_name: '',
        description: '',
        duration: '',
        start_date: '',
        end_date: '',
        category: '',
        price: '',
        rating: ''
      });
    } catch (error) {
      toast.error('Error creating course: ' + error.message);
    }
  };

  return (


  <div className="form-container mt-5">
    <h2 className='courseheading'>Add a new course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="two-column">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="two-column">
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="form-control"
            required
            step="0.1"
            max="5"
            min="0"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
