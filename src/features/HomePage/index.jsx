import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeNavbar from '../../components/HomeNavbar';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Sidebar';
import Account from '../Account';
import Announment from '../Announcement';
import Bookmark from '../Bookmark';
import Cart from '../Cart';
import Newfeed from '../Newfeeds';
import Shop from '../Shop';
import Shopping from '../Shopping';
import GroupOrder from '../GroupOrder';
import Rescue from '../Rescue';
import Checkout from '../Checkout';
import Order from '../Order';
import Profile from '../Profile';
import { useNavigate } from 'react-router-dom';

function HomePage(props) {
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const navigate = useNavigate();
  useEffect(
    () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      if (!currentUser) {
        navigate('/');
      }
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
                  <Route path="/profile/*" element={<Profile />} />
                  <Route path="/announcement" element={<Announment />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shoping" element={<Shopping />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/bookmark" element={<Bookmark />} />
                  <Route path="/group-order" element={<GroupOrder />} />
                  <Route path="/rescue" element={<Rescue />} />
                  <Route path="/checkout/*" element={<Checkout />} />
                  <Route path="/my-order/" element={<Order />} />
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
