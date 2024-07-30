// import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CustomNavbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>UserHub</title>
        <link rel="icon" href="/favicon.png" /> 
      </head>
      <body>
        <CustomNavbar/>
        {children}
        <ToastContainer
        position="top-center"
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

      </body>

    </html>
  );
}
