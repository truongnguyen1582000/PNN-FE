import React from 'react';
import '../assets/styles/Navbar.css';
import logo from '../assets/imgs/logo.png';

function Navbar(props) {
  return (
    <nav className="nav">
      <img src={logo} width="200" className="logo" alt="" />
    </nav>
  );
}

export default Navbar;
