import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('HrSystem');
    
    if (token) {
      navigate('/app');
    }
  }, [navigate]);

  return children;
};

export default LoginGuard;
