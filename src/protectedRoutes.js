import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CurrentUserContext } from "./contexts/currentUser";

const ProtectedRoutes = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  const location = useLocation();

  if (!currentUserState.isLoggedIn && currentUserState.isLoggedIn !== null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
