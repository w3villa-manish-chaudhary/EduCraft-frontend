import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';

import './globals.css';
require('dotenv').config();


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>EduCraft</title>
        <link rel="icon" href="/favicon.png" /> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      </head>
      <body>
        <CustomNavbar/>
<div className='midscreen'> {children} </div>
        

        <ToastContainer
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      
      <Footer/>

      </body>

    </html>
  );
}
