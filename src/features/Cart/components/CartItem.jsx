import React from 'react';
import { useDispatch } from 'react-redux';
import { addMore, descreaseItem } from '../CartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const handleAddMore = () => {
    dispatch(addMore(item));
  };

  const handleDescreaseItem = () => {
    dispatch(descreaseItem(item, -1));
  };
  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={item.image} alt="" />
        <div>
          <p>{item.name}</p>
          <p className="cart-item-price">
            {item.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        </div>
      </div>
      <div className="quantity">
        <button className="btn btn-primary" onClick={handleDescreaseItem}>
          -
        </button>
        <input type="text" value={item.count} />
        <button className="btn btn-primary" onClick={handleAddMore}>
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
