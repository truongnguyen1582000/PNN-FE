import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../../../../api/auth';
import { useNavigate } from 'react-router-dom';

function Register(props) {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.register(userInfo);
      enqueueSnackbar('Create account successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-inner">
        <div className="banner"></div>
        <form className="login-form register-form" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <label htmlFor="username">
            User name <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name..."
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
          />
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            name="email"
            autoComplete="true"
            value={userInfo.email}
            onChange={handleInputChange}
          />
          <label htmlFor="password">
            Password <span>*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={userInfo.password}
            onChange={handleInputChange}
          />
          <label htmlFor="confirmPassword">
            Confirm password <span>*</span>
          </label>
          <input
            type="password"
            placeholder="Retype your password..."
            name="confirmPassword"
            value={userInfo.confirmPassword}
            onChange={handleInputChange}
          />
          <button type="submit">Sign up</button>
          <span className="suggest">
            Already have an account?{' '}
            <Link to="/" className="router-link">
              Sigin In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;
