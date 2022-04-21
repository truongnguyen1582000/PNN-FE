import React from 'react';
import AddedItem from './AddedItem';

function AddedList({ info, cartId }) {
  const infos = Array.from(info.items);

  return (
    <div>
      {infos.length === 0 && (
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
      {infos.length > 0 && (
        <>
          {infos.map((e, idx) => (
            <AddedItem product={e} key={idx} cartId={cartId} />
          ))}
        </>
      )}
    </div>
  );
}

export default AddedList;
