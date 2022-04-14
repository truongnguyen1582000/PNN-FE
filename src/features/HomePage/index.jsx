import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeNavbar from '../../components/HomeNavbar';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Sidebar';
import Account from '../Account';
import Announment from '../Announcement';
import Bookmark from '../Bookmark';
import Cart from '../Cart';
import Knowledge from '../Knowledge';
import Newfeed from '../Newfeeds';
import Shop from '../Shop';
import Shopping from '../Shopping';

function HomePage(props) {
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      setTimeout(() => {
        setLoading(false);
      }, 1);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="homepage ">
      {loading ? (
        <Loading />
      ) : (
        <>
          <HomeNavbar />

          <div className="container">
            <div className="wrapper-main">
              <Sidebar />
              <div className="main">
                <Routes>
                  <Route path="/newfeed" element={<Newfeed />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/announcement" element={<Announment />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shoping" element={<Shopping />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/bookmark" element={<Bookmark />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
