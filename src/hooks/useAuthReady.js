// hooks/useAuthReady.js
import { useEffect, useState } from "react";

export const useAuthReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("HrSystem");
      const company = localStorage.getItem("X-Company");
      return token && company;
    };

    const interval = setInterval(() => {
      if (checkAuth()) {
        setIsReady(true);
        clearInterval(interval);
      }
    }, 100); // check every 100ms for login completion

    return () => clearInterval(interval);
  }, []);

  return isReady;
};
