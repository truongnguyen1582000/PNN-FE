import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { orderApi } from '../../api/order';

function Order(props) {
  const [orderList, setOrderList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const interval = useRef();

  const getMyOrder = async () => {
    try {
      const { data } = await orderApi.getMyOrder();
      setOrderList([...data]);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  useEffect(
    () => {
      getMyOrder();

      interval.current = setInterval(() => {
        getMyOrder();
      }, 2000);

      return () => {
        clearInterval(interval.current);
      };
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="box large-size">
      <div className="box-header">
        <h3 className="box-title">Your Orders</h3>
      </div>
      <div className="box-body">
        {orderList.length === 0 && (
          <div className="text-center">
            <h3>You have no orders</h3>
          </div>
        )}
        {orderList.map((item, index) => {
          return (
            <div className="hey">
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
                    <span>{item.address.name}</span>
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
                  <span className="fwb fwba">
                    {item.status === 'pending' && 'Pending'}
                    {item.status === 'processing' && 'Processing'}
                    {item.status === 'shipping' && 'Shipping'}
                    {item.status === 'completed' && 'Completed'}
                    {item.status === 'cancelled' && 'Cancelled'}
                  </span>
                </div>
              </div>
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
              <div className="total-mon">
                <div className="btn-cancel-order">Cancel order</div>
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

export default Order;
