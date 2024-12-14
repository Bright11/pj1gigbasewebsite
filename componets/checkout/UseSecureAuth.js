import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const UseSecureAuth = (auth) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false); // Authentication checked
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, isAuthenticated, loading };
};

export default UseSecureAuth;
