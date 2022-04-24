import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function CartList({ cartList = [] }) {
  const isShow = cartList?.list?.length === 0 || cartList.length === 0;
  return (
    <div className="cart-list">
      {isShow && (
        <div className="cart-empty">
          <Link to="/home-page/shoping">
            <i className="fa-solid fa-shopping-cart"></i>
          </Link>
          <span>Your cart is empty</span>
          <p
            style={{
              fontSize: '16px',
              marginTop: '9px',
            }}
          >
            Let's buy some thing
          </p>
        </div>
      )}
      {cartList?.list?.map((item, index) => (
        <CartItem item={item} key={index} />
      ))}
    </div>
  );
}

export default CartList;
