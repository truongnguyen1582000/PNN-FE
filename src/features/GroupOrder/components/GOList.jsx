import React from 'react';
import GOitem from './GOitem';
import { Link } from 'react-router-dom';

function GOList({ cartList }) {
  return (
    <div className="box">
      {cartList.length > 0 && (
        <>
          {cartList?.map((item, index) => (
            <GOitem item={item} key={index} cartId={item._id} />
          ))}
        </>
      )}

      {cartList.length === 0 && (
        <div className="cart-empty">
          <Link to="/home-page/shoping">
            <i className="fa-solid fa-backpack"></i>
          </Link>
          <span>Your group cart is empty</span>
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
    </div>
  );
}

export default GOList;
