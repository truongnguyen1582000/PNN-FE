import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

function CartList(props) {
  const cartList = useSelector((state) => state.cart);

  return (
    <div className="cart-list">
      {cartList.list.map((item, index) => (
        <CartItem item={item} key={index} />
      ))}
      {cartList.list.length === 0 ? (
        <div className="cart-empty">
          <i className="fa-solid fa-shopping-cart"></i>
          <span>Your cart is empty</span>
        </div>
      ) : null}
    </div>
  );
}

export default CartList;
