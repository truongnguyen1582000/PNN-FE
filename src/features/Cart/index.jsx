import React, { useEffect } from 'react';
import CartList from './components/CartList';
import { cartTotalSelector } from '../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../Cart/CartSlice';

function Cart(props) {
  const total = useSelector(cartTotalSelector);
  const cartList = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const getCartData = async () => {
    await dispatch(getCart());
  };

  useEffect(
    () => {
      getCartData();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="large-size cart">
      <CartList cartList={cartList} />
      <button
        className={
          total === 0
            ? 'btn btn-primary checkout-btn not-allowed'
            : 'btn btn-primary checkout-btn'
        }
        disabled={total === 0}
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
