import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeNavbar from '../../components/HomeNavbar';
import Sidebar from '../../components/Sidebar';
import Account from '../Account';
import Announment from '../Announcement';
import Bookmark from '../Bookmark';
import Clinic from '../Clinic';
import Knowledge from '../Knowledge';
import Newfeed from '../Newfeeds';
import Videos from '../Videos';
import Zoo from '../Zoo';

function HomePage(props) {
  return (
    <div className="homepage ">
      <HomeNavbar />

      <div className="container">
        <div className="wrapper-main">
          <Sidebar />
          <div className="main">
            <Routes>
              <Route path="/newfeed" element={<Newfeed />} />
              <Route path="/account" element={<Account />} />
              <Route path="/announcement" element={<Announment />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/zoo" element={<Zoo />} />
              <Route path="/clinic" element={<Clinic />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/bookmark" element={<Bookmark />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
