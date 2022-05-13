import React from 'react';
import CheckoutItem from './CheckoutItem';

function CheckoutList({ cart, handleCheckout }) {
  return (
    <div className="box">
      <div className="checkout-title">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>
      {cart?.map((item) => (
        <CheckoutItem dataItem={item} key={item._id} />
      ))}
      <div className="checkout-bottom">
        <div className="message-for-shop">
          <label htmlFor="message">Message: </label>
          <input type="text" id="message" placeholder="Note to seller." />
        </div>
        <span>
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            Total price:{' '}
          </span>
          {cart
            ?.reduce((total, item) => {
              return total + item.product.price * item.quantity;
            }, 0)
            .toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
            .replace('VND', '₫')}
        </span>
      </div>

      <div className="checkout-finish">
        <button className="btn btn-primary" onClick={() => handleCheckout()}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CheckoutList;
