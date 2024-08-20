'use client'
require('dotenv').config();
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import CourseCard from '../../components/CourseCard';


export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/showallcourse`);
        setCourses(response.data.data);
        setIsLoading(false);
      } catch (error) {
        alert('Failed to fetch courses. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
        <Spinner animation="border" role="status">
        </Spinner>
    );
  }



  return (
    <Container className="my-5">
      <h1 className="mb-4 mt-4 text-center">Available Courses</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((course) => (
          <Col>
            <CourseCard courseData={course} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}