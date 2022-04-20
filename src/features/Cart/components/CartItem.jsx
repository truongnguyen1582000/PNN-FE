import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartApi } from '../../../api/cart';
import { getCart } from '../../Cart/CartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('USER'));

  const getCartData = async () => {
    await dispatch(getCart());
  };

  useEffect(
    () => {
      getCartData();
    },
    // eslint-disable-next-line
    []
  );
  const handleIncrease = async () => {
    await cartApi.addToCart({
      productId: item.product._id,
    });

    await getCartData();
  };

  const handleDecrease = async () => {
    await cartApi.addToCart({
      productId: item.product._id,
      number: -1,
    });

    await getCartData();
  };

  const handleDeleteCartItem = async () => {
    await cartApi.deleteCartItem({
      productId: item.product._id,
    });

    await getCartData();
  };

  const handleChange = async (e) => {
    await cartApi.addToCart({
      productId: item.product._id,
      number: e.target.value,
    });

    await getCartData();
  };

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={item.product.image} alt="" />
        <div>
          <p>{item.product.name}</p>
          <p className="cart-item-price">
            {item.product?.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        </div>
      </div>
      <div className="cart-action">
        <div className="quantity">
          <button className="btn btn-primary" onClick={handleDecrease}>
            -
          </button>
          <input type="text" value={item.quantity} onChange={handleChange} />
          <button className="btn btn-primary" onClick={handleIncrease}>
            +
          </button>
        </div>
        <div className="delete-cart-item">
          <button className="btn btn-danger" onClick={handleDeleteCartItem}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
