import React from 'react';
import { Card, Badge, ListGroup } from 'react-bootstrap';

const CourseCard = ({ courseData }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{courseData.course_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Badge bg="info">{courseData.category}</Badge>
        </Card.Subtitle>
        <Card.Text>{courseData.description}</Card.Text>
        <ListGroup variant="flush">
          <ListGroup.Item>Duration: {courseData.duration}</ListGroup.Item>
          <ListGroup.Item>Start: {new Date(courseData.start_date).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item>End: {new Date(courseData.end_date).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item>Price: ${courseData.price}</ListGroup.Item>
          <ListGroup.Item>Rating: {courseData.rating}/5</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <button className="btn btn-primary w-100">Enroll Now</button>
      </Card.Footer>
    </Card>
  );
};

export default CourseCard;