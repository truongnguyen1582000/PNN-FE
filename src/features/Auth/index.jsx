import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/inedx';
import Register from './Pages/Register/inedx';

function Auth() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Auth;
