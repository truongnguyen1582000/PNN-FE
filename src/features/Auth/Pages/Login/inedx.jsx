import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../../../../api/auth';
import { login } from '../../authSlice';

function Login() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userAPI.login(userInfo);
      const action = login(res);
      dispatch(action);
      enqueueSnackbar('WELLCOME to PPN', { variant: 'success' });
      navigate('/home-page');
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3>Sign in</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="true"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        autoComplete="true"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <button type="submit">Sign in</button>
      <span className="suggest">
        Don't have an account yet?{' '}
        <Link to="/auth/register" className="router-link">
          Sign Up
        </Link>
      </span>
    </form>
  );
}

export default Login;
