import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addressAPI } from '../../api/address';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import CheckoutList from './components/CheckoutList';
import CheckoutGO from './components/CheckoutGO';
import { useSnackbar } from 'notistack';
import { orderApi } from '../../api/order';

function Checkout(props) {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [open, setOpen] = useState(false);
  // const [cart, setCart] = useState(null);
  const cart = JSON.parse(localStorage.getItem('cart'));
  const location = useLocation();
  const [mode, setMode] = useState(1);
  const GOcart = JSON.parse(localStorage.getItem('GOcart'));
  const [checkoutGOcart, setCheckoutGOcart] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const getAddress = async () => {
    const { data } = await addressAPI.getAddress();
    setAddressList(data);
  };

  const handleCheckoutMyCart = () => {};

  const handleCheckoutGO = async (message) => {
    const result = checkoutGOcart.info
      .map((e) => e.items)
      .reduce((acc, cur) => acc.concat(cur), []);
    const to = result[0].product.shopOwner;

    try {
      await orderApi.createOrder({
        address: addressList.addressList[selectedAddress],
        to,
        orderInfo: result,
        message,
        cart: location.pathname.split('/').pop().toString(),
      });

      enqueueSnackbar('Order created successfully', {
        variant: 'success',
      });

      // redirect to /my-order
      navigate('/home-page/my-order');
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  useEffect(
    () => {
      getAddress();
      setSelectedAddress(0);

      if (location.pathname.split('/').pop() !== 'checkout') {
        setMode(2);
        setCheckoutGOcart(
          GOcart[
            GOcart.findIndex(
              (item) =>
                item._id.toString() ===
                location.pathname.split('/').pop().toString()
            )
          ]
        );
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="iii">
      <div className="box">
        <div className="checkout-heading">Checkout</div>
        <div className="">
          <div className="hehe"></div>
          <div className="ooo">
            <div className="ppp">
              <i className="fa-solid fa-location-dot"></i>
              <p>Địa chỉ nhận hàng</p>
              <button
                className="invite-friend create-new-address"
                onClick={() => setOpen(true)}
              >
                <i className="fa-solid fa-plus"></i>
                <span>Add new address</span>
              </button>
            </div>
            {open && (
              <AddressForm
                closePop={() => setOpen(false)}
                getAddress={getAddress}
              />
            )}

            <AddressList
              info={addressList}
              selectedAddress={selectedAddress}
              getAddress={getAddress}
              handleChangeAddress={(index) => setSelectedAddress(index)}
            />
          </div>
        </div>
      </div>
      <div className="box">
        {mode === 1 && (
          <CheckoutList cart={cart} handleCheckout={handleCheckoutMyCart} />
        )}
        {mode === 2 && (
          <CheckoutGO
            checkoutGOcart={checkoutGOcart}
            handleCheckoutGO={handleCheckoutGO}
          />
        )}
      </div>
    </div>
  );
}

export default Checkout;
