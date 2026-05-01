// frontend/src/pages/AuthCallback.jsx

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // get token from URL query parameter
    const token = searchParams.get('token');
    
    if (token) {
      // store token in localStorage
      localStorage.setItem('token', token);
      
      // redirect to home
      navigate('/');
    } else {
      // no token found - something went wrong
      console.error('No token received from OAuth');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  // show loading while processing
  return (
    <div>
      <p>Logging you in...</p>
    </div>
  );
}

export default AuthCallback;