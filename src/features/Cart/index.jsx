import React, { useEffect, useState } from 'react';
import CartList from './components/CartList';
import { cartTotalSelector } from '../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';
import PopupInvite from './components/PopupInvite';
import { cartApi } from '../../api/cart';
import { setCart } from '../Cart/CartSlice';

function Cart(props) {
  const total = useSelector(cartTotalSelector);
  const [showPopupInvite, setShowPopupInvite] = useState(false);
  const dispatch = useDispatch();

  const getCart = async () => {
    const response = await cartApi.getCart();
    dispatch(setCart(response?.data?.cartItems));
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="large-size cart">
      <button
        className="invite-friend"
        onClick={() => setShowPopupInvite(true)}
      >
        <i className="fa-solid fa-user-friends"></i>
        <span>Invite a friend</span>
      </button>
      <PopupInvite
        showPopupInvite={showPopupInvite}
        setShowPopupInvite={setShowPopupInvite}
      />
      <CartList />
      <button
        className={
          total === 0
            ? 'btn btn-primary checkout-btn not-allowed'
            : 'btn btn-primary checkout-btn'
        }
        disabled={total === 0}
        onClick={() => console.log('first')}
      >
        <span>Go to checkout: </span>
        {total.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </button>
    </div>
  );
}

export default Cart;
