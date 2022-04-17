import React, { useState } from 'react';
import CartList from './components/CartList';
import { cartTotalSelector } from '../../utils/selector';
import { useSelector } from 'react-redux';
import PopupInvite from './components/PopupInvite';

function Cart(props) {
  const total = useSelector(cartTotalSelector);
  const [showPopupInvite, setShowPopupInvite] = useState(false);
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
