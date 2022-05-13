import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addressAPI } from '../../api/address';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import CheckoutList from './components/CheckoutList';
import CheckoutGO from './components/CheckoutGO';

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

  const getAddress = async () => {
    const { data } = await addressAPI.getAddress();
    setAddressList(data);
  };

  const handleCheckout = () => {
    console.log(selectedAddress);
    console.log(checkoutGOcart);
  };

  useEffect(
    () => {
      getAddress();
      setSelectedAddress(addressList[0]);

      if (location.pathname.split('/').pop() !== 'checkout') {
        setMode(2);
        console.log(GOcart);
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

      console.log(mode);
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
              selectAddress={(index) => setSelectedAddress(addressList[index])}
              getAddress={getAddress}
              selectedAddress={selectedAddress}
            />
          </div>
        </div>
      </div>
      <div className="box">
        {mode === 1 && <CheckoutList cart={cart} />}
        {mode === 2 && (
          <CheckoutGO
            checkoutGOcart={checkoutGOcart}
            handleCheckout={handleCheckout}
          />
        )}
      </div>
    </div>
  );
}

export default Checkout;
