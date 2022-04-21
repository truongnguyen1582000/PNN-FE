import React from 'react';
import { useDispatch } from 'react-redux';
import { groupOrderAPI } from '../../../api/groupOrder';
import { getGroupOrderCart } from '../GroupOrderSlice';

function AddedItem({ product, cartId }) {
  const dispatch = useDispatch();

  const handleIncreaseGOCartItem = async () => {
    await groupOrderAPI.addMoreItemToGO(cartId, product.product._id);
    await dispatch(getGroupOrderCart());
  };

  const handleDecreaseGOCartItem = async () => {
    await groupOrderAPI.addMoreItemToGO(cartId, product.product._id, {
      number: -1,
    });
    await dispatch(getGroupOrderCart());
  };

  const handleDeleteItem = async () => {
    await groupOrderAPI.deleteItemFromGO(cartId, product.product._id);
    await dispatch(getGroupOrderCart());
  };

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={product.product.image} alt="" />
        <div>
          <p>{product.product.name}</p>
          <p className="cart-item-price">
            {product.product?.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        </div>
      </div>
      <div className="cart-action">
        <div className="quantity">
          <button
            className="btn btn-primary"
            onClick={handleDecreaseGOCartItem}
          >
            -
          </button>
          <input type="text" value={product.quantity} />
          <button
            className="btn btn-primary"
            onClick={handleIncreaseGOCartItem}
          >
            +
          </button>
        </div>
        <div className="delete-cart-item">
          <button className="btn btn-danger" onClick={handleDeleteItem}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddedItem;
