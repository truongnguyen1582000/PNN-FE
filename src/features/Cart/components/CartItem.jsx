import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartApi } from '../../../api/cart';
import { setCart } from '../../Cart/CartSlice';

function CartItem({ item }) {
  console.log(item);
  const dispatch = useDispatch();

  const getCart = async () => {
    const response = await cartApi.getCart();
    dispatch(setCart(response?.data?.cartItems));
  };

  const handleIncrease = async () => {
    await cartApi.addToCart({
      productId: item.product._id,
    });

    await getCart();
  };

  const handleDecrease = async () => {
    await cartApi.addToCart({
      productId: item.product._id,
    });

    await getCart();
  };

  // const handleChange = (e) => {
  //   setQuantity(e.target.value);
  //   dispatch(setQuanity({ item, quantity: e.target.value }));
  // };

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
      <div className="quantity">
        <button className="btn btn-primary" onClick={handleDecrease}>
          -
        </button>
        <input type="text" value={item.quantity} />
        <button className="btn btn-primary" onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
