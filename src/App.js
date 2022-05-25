import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './features/Auth';
import HomePage from './features/HomePage';
import Landing from './features/Landing';
import InvitePage from './features/InvitePage';

function App() {
  return (
    <div className="App grid-bg ba-grid anim">
      <div className="inner"></div>
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
