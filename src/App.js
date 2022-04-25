import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Auth from './features/Auth';
import HomePage from './features/HomePage';
import Landing from './features/Landing';
import InvitePage from './features/InvitePage';

function App() {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const navigate = useNavigate();

  useEffect(
    () => {
      if (currentUser?._id) {
        navigate('/home-page/newfeed');
      } else {
        return navigate('/');
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
