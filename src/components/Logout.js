import React from 'react';
import AuthService from '../services/Auth/AuthService';
import { useNavigate, Navigate } from 'react-router-dom';

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(AuthService.isLoggedIn());
  const navigate = useNavigate();

  const handleLogout = (event) => {
    AuthService.logout();
    setIsLoggedIn(AuthService.isLoggedIn());
    navigate('/', { replace: true });
  };

  return (
    <>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-outline-danger"
        >
          Logout
        </button>
      )}
    </>
  );
};

export default Logout;
