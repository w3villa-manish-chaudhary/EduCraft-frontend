'use client';
require('dotenv').config();
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';
import ReduxProvider from '@/Redux/provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>EduCraft</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      </head>
      <body>
        <ReduxProvider>
          <CustomNavbar />
          <div className='midscreen'> {children} </div>
          <Footer />
        </ReduxProvider>
        <ToastContainer
        />
      </body>
    </html>
  );
}
