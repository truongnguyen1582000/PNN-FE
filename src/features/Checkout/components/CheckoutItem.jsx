import React from 'react';

function CheckoutIterm({ dataItem }) {
  return (
    <div>
      <div className="checkout-item">
        <div className="checkout-item-img">
          <img src={dataItem?.product?.image} alt="" />
        </div>
        <div className="checkout-item-name">{dataItem?.product?.name}</div>
        {/* price vnd */}
        <div className="checkout-item-price">
          {dataItem?.product?.price
            .toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
            .replace('VND', '₫')}
        </div>
        <div className="checkout-item-quantity">{dataItem?.quantity}</div>
        <div className="into-money">
          {(dataItem?.product?.price * dataItem?.quantity)
            .toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
            .replace('VND', '₫')}
        </div>
      </div>
    </div>
  );
}

export default CheckoutIterm;
