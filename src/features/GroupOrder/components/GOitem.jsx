import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import OrderList from './OrderList';
import PopupInvite from '../../Cart/components/PopupInvite';
import { groupOrderAPI } from '../../../api/groupOrder';
import { getGroupOrderCart } from '../GroupOrderSlice';

function GOitem({ item, cartId }) {
  console.log(item);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const isCartOwner = currentUser._id === item.cartOwner._id;

  const total = item.info.reduce((acc, cur) => {
    const totalPerPerson = cur.items.reduce(
      (acc, curz) => acc + curz.quantity * curz.product.price,
      0
    );
    return acc + totalPerPerson;
  }, 0);

  return (
    <div className="go-item box" style={{ width: '100%' }}>
      <div className="go-header">
        <img
          src={item.cartOwner?.avatar}
          alt=""
          width={30}
          height={30}
          className="avatar"
        />
        <p className="name">{item.cartOwner.username} (Owner)</p>
        <p
          style={{
            marginLeft: '300px',
          }}
        >
          Cart name:{' '}
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            {item.name}
          </span>
        </p>
        {isCartOwner && (
          <button className="invite-friend" onClick={() => setShowPopup(true)}>
            <i className="fa-solid fa-user-friends"></i>
            <span>Invite a friend</span>
          </button>
        )}
        <PopupInvite
          showPopupInvite={showPopup}
          closePopup={() => setShowPopup(false)}
          cartId={cartId}
        />
        {/* create a button to delete cart */}
        {isCartOwner && (
          <button
            className="btn btn-danger delete-go"
            onClick={async () => {
              await groupOrderAPI.delelteGO(cartId);
              dispatch(getGroupOrderCart());
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}

        {/* create leave button */}
        {!isCartOwner && (
          <button
            className="leave-go"
            onClick={async () => {
              await groupOrderAPI.leaveGO(cartId);
              dispatch(getGroupOrderCart());
            }}
          >
            Leave
          </button>
        )}
      </div>
      <div className="go-body " style={{ width: '100%' }}>
        <OrderList list={item} cartId={cartId} />
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
    </div>
  );
}

export default GOitem;
