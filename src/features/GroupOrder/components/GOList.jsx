import React from 'react';
import GOitem from './GOitem';

function GOList({ cartList }) {
  return (
    <div className="box">
      {cartList.length > 0 && (
        <>
          {cartList.map((item, index) => {
            return <GOitem item={item} key={index} />;
          })}
        </>
      )}

      {cartList.length === 0 && (
        <div className="cart-empty">
          <i className="fa-solid fa-backpack"></i>
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
