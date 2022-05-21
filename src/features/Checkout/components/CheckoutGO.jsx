import React, { useState } from 'react';

function CheckoutGO({ checkoutGOcart, handleCheckoutGO }) {
  const [message, setMessage] = useState('');
  return (
    <div>
      <div className="checkout-title">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>
      {checkoutGOcart.info.map((e) =>
        e.items.map((item) => (
          <div className="checkout-item">
            <div className="checkout-item-img">
              <img src={item?.product?.image} alt="" />
            </div>
            <div className="checkout-item-name">{item?.product?.name}</div>
            {/* price vnd */}
            <div className="checkout-item-price">
              {item?.product?.price
                .toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })
                .replace('VND', '₫')}
            </div>
            <div className="checkout-item-quantity">{item?.quantity}</div>
            <div className="into-money">
              {(item?.product?.price * item?.quantity)
                .toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })
                .replace('VND', '₫')}
            </div>
          </div>
        ))
      )}

      <div className="checkout-bottom">
        <div className="message-for-shop">
          <label htmlFor="message">Message: </label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Note to seller."
          />
        </div>
        <span>
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            Total price:{' '}
          </span>
          {checkoutGOcart.info
            ?.reduce((total, item) => {
              return (
                total +
                item.items.reduce((total, item) => {
                  return total + item.product.price * item.quantity;
                }, 0)
              );
            }, 0)
            .toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
            .replace('VND', '₫')}
        </span>
      </div>

      <div className="checkout-finish">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleCheckoutGO(message);
            setMessage('');
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CheckoutGO;
