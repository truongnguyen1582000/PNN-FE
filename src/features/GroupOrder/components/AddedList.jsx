import React from 'react';
import AddedItem from './AddedItem';
import { Link } from 'react-router-dom';

function AddedList({ info, cartId }) {
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const isItemOwner = currentUser._id === info.addedBy._id;
  const infos = Array.from(info.items);

  return (
    <div>
      {infos.length === 0 && (
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
      {infos.length > 0 && (
        <>
          {infos.map((e, idx) => (
            <AddedItem
              product={e}
              key={idx}
              cartId={cartId}
              isItemOwner={isItemOwner}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default AddedList;
