// import React from 'react';
// import './home.css';

// function loginhome() {
//   return (
//     <h1><div className=' text-center mt-5'>Welcome to the Home Page After login</div></h1>
//   )
// }

// export default loginhome







// import React from 'react';
// import './home.css';

// const isAuthenticated = false;

// function LoginHome() {
//   return (
//     <div>
//       {isAuthenticated ? (
//         <div className="text-center mt-5">
//           <h1>Welcome to the Home Page After Login</h1>
//         </div>
//       ) : (
//         <div className="text-center mt-5">
//           <h1>Please log in to continue</h1>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LoginHome;







// 'use client'
// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // use 'next/navigation' instead of 'next/router'
// import './home.css';

// const isAuthenticated = false; // Set to false to test redirection

// function LoginHome() {
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated ) {
//       router.push('/login');
//     }
//   }, [isAuthenticated , router]);

//   if (!isAuthenticated ) {
//     return null;
//   }

//   return (
//     <div>
//       <div className="text-center mt-5">
//         <h1>Welcome to the Home Page After Login</h1>
//       </div>
//     </div>
//   );
// }

// export default LoginHome;







'use client'
import React, { useEffect , useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; 
import './home.css';

const isAuthenticated = true;
// const isAuthenticated = true; 

function LoginHome() {
  const router = useRouter();
  // const hasShownToast = useRef(false);

  // useEffect(() => {
  //   if (!isAuthenticated && !hasShownToast.current) {
  //     toast.error('Please log in to continue');
  //      hasShownToast.current = true;
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated ) {
      toast.error('Please log in to continue'); 
      router.push('/login');
    }
  }, [isAuthenticated , router]);

  // if (!isAuthenticated ) {
  //   return null;
  // }

  return (
    <div>
      <div className="text-center mt-5">
        <h1>Welcome to the Home Page After Login</h1>
      </div>
    </div>
  );
}

export default LoginHome;