import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCart } from '../features/Cart/CartSlice';

function Sidebar(props) {
  const cartList = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getCartData = async () => {
    await dispatch(getCart());
  };

  useEffect(
    () => {
      getCartData();
    },
    // eslint-disable-next-line
    []
  );

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
          to="/home-page/shop"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-store"></i>
          <span>My Shop</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/shoping"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-shop"></i>
          <span>Shoping</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/cart"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Cart</span>
          <div className="cart-counter">
            <span className="counter">{cartList.list.length}</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home-page/group-order"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-backpack"></i>
          <span>Group order</span>
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
          to="/"
          className={({ isActive }) => (isActive ? 'activeNav' : '')}
        >
          <i className="fa-solid fa-dog"></i>
          <span>Pet Information</span>
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
