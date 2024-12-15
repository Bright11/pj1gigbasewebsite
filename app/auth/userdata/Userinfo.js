// hooks/useUser.js
import { useState, useEffect } from "react";

export const Userinfo = () => {
  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
        setUserinfo(JSON.parse(userData));
    }else{
      setUserinfo(null)
    }
    
  }, []);

  return userinfo;
};
