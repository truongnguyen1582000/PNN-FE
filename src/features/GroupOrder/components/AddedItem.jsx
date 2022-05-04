import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { groupOrderAPI } from '../../../api/groupOrder';
import { getGroupOrderCart } from '../GroupOrderSlice';
import ConfirmDelete from './ConfirmDelete';

function AddedItem({ product, cartId, isItemOwner }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

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

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={product.product.image} alt="" />
        <div>
          <p>{product.product.name}</p>
          <p className="cart-item-price">
            {product.product?.price
              .toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })
              .replace('VND', '₫')}
          </p>
        </div>
      </div>
      <div className="cart-action">
        <div className="quantity">
          <button
            className={`btn btn-primary ${!isItemOwner ? 'disabled' : ''}`}
            onClick={() => {
              if (product.quantity === 1) {
                // show popup for confirm
                return setShow(true);
              }
              handleDecreaseGOCartItem();
            }}
            disabled={!isItemOwner}
          >
            -
          </button>
          <input type="text" value={product.quantity} readOnly />
          <button
            className={`btn btn-primary ${!isItemOwner ? 'disabled' : ''}`}
            onClick={handleIncreaseGOCartItem}
            disabled={!isItemOwner}
          >
            +
          </button>
        </div>
        <div className="delete-cart-item">
          <button
            className={`btn btn-danger ${isItemOwner ? '' : 'disabled'}`}
            onClick={() => {
              setShow(true);
            }}
            disabled={!isItemOwner}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      {show && (
        <ConfirmDelete
          closePopup={() => setShow(false)}
          handleDeleteItem={handleDecreaseGOCartItem}
        />
      )}
    </div>
  );
}

export default AddedItem;
