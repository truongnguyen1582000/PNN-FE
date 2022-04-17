import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMore, descreaseItem, setQuanity } from '../CartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.count);
  const handleAddMore = () => {
    dispatch(addMore(item));
  };

  const handleDescreaseItem = () => {
    dispatch(descreaseItem(item, -1));
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
    dispatch(setQuanity({ item, quantity: e.target.value }));
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
        <input type="text" value={quantity} onChange={handleChange} />
        <button className="btn btn-primary" onClick={handleAddMore}>
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
