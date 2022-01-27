import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_AUTHORIZED':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    case 'SET_UNAUTHORIZED':
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
