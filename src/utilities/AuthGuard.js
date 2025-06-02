import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  

    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("HrSystem");
  
      // Redirect to /Auth if the token is missing or invalid
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);
  
    return children;
  };
  
  

export default AuthGuard;
