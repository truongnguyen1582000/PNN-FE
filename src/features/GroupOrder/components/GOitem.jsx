import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import OrderList from './OrderList';
import PopupInvite from '../../Cart/components/PopupInvite';
import { groupOrderAPI } from '../../../api/groupOrder';
import { getGroupOrderCart } from '../GroupOrderSlice';

function GOitem({ item, cartId }) {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="go-item box" style={{ width: '100%' }}>
      <div className="go-header">
        <img
          src={item.cartOwner.avatar}
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
        <button className="invite-friend" onClick={() => setShowPopup(true)}>
          <i className="fa-solid fa-user-friends"></i>
          <span>Invite a friend</span>
        </button>
        <PopupInvite
          showPopupInvite={showPopup}
          closePopup={() => setShowPopup(false)}
          cartId={cartId}
        />
        {/* create a button to delete cart */}
        <button
          className="btn btn-danger delete-go"
          onClick={async () => {
            await groupOrderAPI.delelteGO(cartId);
            dispatch(getGroupOrderCart());
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
      <div className="go-body " style={{ width: '100%' }}>
        <OrderList list={item} cartId={cartId} />
      </div>
    </div>
  );
}

export default GOitem;
