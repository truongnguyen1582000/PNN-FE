import React, { useEffect } from 'react';
import CartList from './components/CartList';
import { cartTotalSelector } from '../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../Cart/CartSlice';
import { useNavigate } from 'react-router-dom';

function Cart(props) {
  const total = useSelector(cartTotalSelector);
  const cartList = useSelector((state) => state.cart);
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    navigate('/home-page/checkout');
  };

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
        onClick={handleCheckout}
      >
        <span>Go to checkout: </span>
        {total
          .toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })
          .replace('VND', '₫')}
      </button>
    </div>
  );
}

export default Cart;
