import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Auth from './features/Auth';
import HomePage from './features/HomePage';
import Landing from './features/Landing';
import InvitePage from './features/InvitePage';

function App() {
  const currentUser = useSelector((state) => state.user.current);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    () => {
      if (currentUser._id) {
        if (location.pathname === '/') {
          navigate('/home-page/newfeed');
        } else {
          navigate(location.pathname);
        }
      }
    },
    // eslint-disable-next-line
    [location.pathname === '/']
  );
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/home-page/*" element={<HomePage />} />
        <Route path="/invite/*" element={<InvitePage />} />
      </Routes>
    </div>
  );
}

export default App;
