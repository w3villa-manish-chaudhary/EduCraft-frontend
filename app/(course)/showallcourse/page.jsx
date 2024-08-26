"use client";
import React, { useEffect, useState } from "react";
import CardCourse from "../../components/courseCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Page() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchData = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/showallcourse`);
      setDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span className="visually-hidden" role="status">
            Loading...
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex gap-2 flex-wrap">
        {details.map((course) => (
          <CardCourse key={course.uniqueId} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Page;
