import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar(props) {
  return (
    <ul className="sidebar">
      <li>
        <NavLink
          to="/home-page/newfeed"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-house-chimney"></i>
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/account"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-user"></i>
          <span>Account</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/announcement"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-bell"></i>
          <span>Announcement</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/videos"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-video"></i>
          <span>Videos</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/zoo"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-paw"></i>
          <span>Zoo</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/clinic"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-hospital"></i>
          <span>Clinic</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/knowledge"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-book"></i>
          <span>Knowledge</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/bookmark"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-bookmark"></i>
          <span>Bookmark</span>
        </NavLink>
      </li>
      <p className="copy-right">© PET PLAYGROUND NETWORK 2022.</p>
    </ul>
  );
}

export default Sidebar;
