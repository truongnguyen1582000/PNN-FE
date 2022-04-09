import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Auth from './features/Auth';
import HomePage from './features/HomePage';
import Landing from './features/Landing';

function App() {
  const currentUser = useSelector((state) => state.user.current);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser._id) {
      navigate('/home-page/newfeed');
    }
  }, [location.pathname === '/']);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/home-page/*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
