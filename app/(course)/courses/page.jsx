"use client";
import React, { useEffect, useState } from "react";
import CardCourse from "../../components/courseCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";


const Page = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/showallcourse`
      );
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
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-5">Available Courses</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {details.map((course) => (
          <div key={course.uniqueId} className="col">
            <Link href={`/courses/${course.uniqueId}`} passHref legacyBehavior>
              <a className="text-decoration-none">
                <CardCourse course={course} />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;