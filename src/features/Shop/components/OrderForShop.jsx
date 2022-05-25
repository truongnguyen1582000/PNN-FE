import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { orderApi } from '../../../api/order';
import moment from 'moment';

function OrderForShop(props) {
  const [orderList, setOrderList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const interval = useRef();

  const getShopOrder = async () => {
    try {
      const { data } = await orderApi.getShopOrder();
      setOrderList([...data]);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  useEffect(
    () => {
      getShopOrder();

      interval.current = setInterval(() => {
        getShopOrder();
      }, 2000);

      return () => {
        clearInterval(interval.current);
      };
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div>
      <div
        className="box-header"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h3 className="box-title">Shop Orders</h3>
      </div>
      {orderList.length === 0 && (
        <div className="box-body">
          <p
            style={{
              textAlign: 'center',
            }}
          >
            You have no order !
          </p>
        </div>
      )}
      <div className="box-body">
        {orderList.map((item, index) => {
          return (
            <div className="hey" key={index}>
              <div className="info-top">
                <div className="address">
                  <span
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Address:{' '}
                  </span>
                  <span className="">
                    <span>{item.address.name} </span>
                    {/* replace first number  = +84 */}
                    <span>{item.address.phone.replace(/^0+/, '(+84) ')}</span>
                  </span>
                  {item.address.addressDetail}
                </div>
                <div className="order-status">
                  <span
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Status:{' '}
                  </span>
                  <span
                    className="fwb fwba"
                    style={{
                      color:
                        item.status === 'pending'
                          ? '#9EA7AD'
                          : item.status === 'processing'
                          ? '#2DCCFF'
                          : item.status === 'completed'
                          ? 'green'
                          : item.status === 'cancelled'
                          ? '#FF3838'
                          : '#FFB302',
                    }}
                  >
                    {item.status === 'pending' && 'Pending'}
                    {item.status === 'processing' && 'Processing'}
                    {item.status === 'shipping' && 'Shipping'}
                    {item.status === 'completed' && 'Completed'}
                    {item.status === 'cancelled' && 'Cancelled'}
                  </span>
                </div>
              </div>
              {/* date order */}
              <span>
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Order date:
                </span>{' '}
                {moment(item.createdAt).format('DD/MM/YYYY')}
              </span>
              <div className="checkout-title">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {item?.orderInfo?.map((e, i) => (
                <div className="checkout-item" key={i}>
                  <div className="checkout-item-img">
                    <img src={e?.product?.image} alt="" />
                  </div>
                  <div className="checkout-item-name">{e?.product?.name}</div>
                  {/* price vnd */}
                  <div className="checkout-item-price">
                    {e?.product?.price
                      .toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })
                      .replace('VND', '₫')}
                  </div>
                  <div className="checkout-item-quantity">{e?.quantity}</div>
                  <div className="into-money">
                    {(e?.product?.price * e?.quantity)
                      .toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })
                      .replace('VND', '₫')}
                  </div>
                </div>
              ))}
              <div className="message">
                <span>Message: </span>
                <span>
                  {item.message.trim().length === 0 ? 'None' : item.message}
                </span>
              </div>
              <div className="total-mon">
                <select
                  id="cars"
                  name="status"
                  className="select"
                  onChange={async (e) => {
                    await orderApi.changeStatus(item._id, e.target.value);
                    getShopOrder();
                  }}
                  value={item.status}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipping">Shipping</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span>
                  <span
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Total price:{' '}
                  </span>
                  {item.orderInfo
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderForShop;
