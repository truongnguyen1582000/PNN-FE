import React, { useState } from 'react';
import '../assets/styles/Navbar.css';
import logo from '../assets/imgs/logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/Auth/authSlice';
import { useSnackbar } from 'notistack';

function HomeNavbar(props) {
  const currentUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    enqueueSnackbar('Bye bye 🐶🐶🐶', { variant: 'success' });
    navigate('/');
  };

  return (
    <nav className="nav home-nav">
      <div className="container">
        <Link to="/">
          <img src={logo} width="100" className="logo" alt="" />
        </Link>
        <div className="input-wrapper">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            name="search"
            placeholder="Search on PET PLAYGROUND NETWORK"
          />
        </div>
        <div className="navbar-end">
          <div className="notification">
            <i className="fa-solid fa-bell"></i>
            <div className="count">1</div>
          </div>
          <div
            className="user-account"
            onClick={() => setShowSubMenu(!showSubMenu)}
          >
            <img
              src="https://d3u2xd68tejot5.cloudfront.net/avatar/thumbs/av.truong-nguyen-14.62470eb1e7d5f.webp"
              alt=""
            />
            <span>{currentUser.username}</span>
            {showSubMenu && (
              <div className="submenu">
                <ul>
                  <li>
                    <Link to="/home-page/account">My profile</Link>
                  </li>
                  <li onClick={handleLogout}>
                    Logout <i className="fa-solid fa-right-from-bracket"></i>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;