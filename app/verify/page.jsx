"use client";
import { useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

const Verify = () => {
  const router = useRouter(); 


  const verifyUser = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    console.log("Authorization code:", code);

    if (code) {
      try {
        const response = await axios.get('http://localhost:8000/kivo/callback', {
          params: { code }
        });

        console.log("???????????????>>>>>>>>>>>>>>",response);
      
        if (response.status === 200) {
          router.push('/courses');
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };


  useEffect(() => {
    verifyUser();
  }, []);

  return <h1>Loading...</h1>;
};

export default Verify;
