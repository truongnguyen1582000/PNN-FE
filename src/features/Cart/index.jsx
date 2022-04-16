import React from 'react';
import CartList from './components/CartList';
import { cartTotalSelector } from '../../utils/selector';
import { useSelector } from 'react-redux';

function Cart(props) {
  const total = useSelector(cartTotalSelector);
  console.log(total);
  return (
    <div className="large-size cart">
      <button className="invite-friend">
        <i className="fa-solid fa-user-friends"></i>
        <span>Invite a friend</span>
      </button>
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
