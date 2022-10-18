import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import shallow from "zustand/shallow";

import useStore from "../../store/useStore";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, getMe } = useStore((state) => {
    return {
      isLoggedIn: state.authSlide.isLoggedIn,
      getMe: state.authSlide.getMe,
    };
  }, shallow);

  useEffect(() => {
    if (isLoggedIn) {
      getMe();
    }
  }, []);

  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" state={{ from: "/login" }} />;
  }

  return children;
};

export default PrivateRoute;
