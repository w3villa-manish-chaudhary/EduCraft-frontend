"use client";
import axios from 'axios';

const Page = () => {
    const fetchData = async () => {
      
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(">>>>>>>>>>>.", response); 
        

        // axios.get("https://jsonplaceholder.typicode.com/posts")
        // .then((response) => {
        //   console.log(">>>>>>>>>>>.", response); 
        // })
    }

    fetchData();
    


  return (
    <div>
      <div className="container">
        <h1>Welcome to the Home Page</h1>
        <p>This is an example page with a Home page.</p>

      </div>
    </div>
  );
};

export default Page;
