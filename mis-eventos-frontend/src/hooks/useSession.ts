import { useState, useEffect } from 'react';

const useSession = (stateToken?: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken || stateToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [stateToken]);

  return isAuthenticated;
};

export default useSession;
