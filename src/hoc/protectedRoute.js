import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/currentUser';

const ProtectedRoute = ({ children }) => {
  const [currenUserState] = useContext(CurrentUserContext);

  if (!currenUserState.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute;
