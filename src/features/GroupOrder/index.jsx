import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupOrderAPI } from '../../api/groupOrder';
import GOList from './components/GOList';
import PopupCreateOrder from './components/PopupCreateOrder';
import { getGroupOrderCart } from './GroupOrderSlice';

function GroupOrder(props) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const groupOrder = useSelector((state) => state.GOcart);

  const { enqueueSnackbar } = useSnackbar();

  const handleGetGroupOrder = async () => {
    dispatch(getGroupOrderCart());
  };

  useEffect(() => {
    setInterval(() => {
      handleGetGroupOrder();
    }, 5000);
  }, []);

  const handleCreateGO = async (GOName) => {
    if (!GOName) {
      return enqueueSnackbar('Please enter group order name', {
        variant: 'error',
      });
    }
    await groupOrderAPI.createGO({
      name: GOName,
    });
    await handleGetGroupOrder();
  };
  return (
    <div className="large-size cart">
      {/* <button
        className="invite-friend"
        onClick={() => setShowPopupInvite(true)}
      >
        <i className="fa-solid fa-user-friends"></i>
        <span>Invite a friend</span>
      </button>
      <PopupInvite
        showPopupInvite={showPopupInvite}
        setShowPopupInvite={setShowPopupInvite}
      /> */}
      <button
        className="invite-friend"
        onClick={() => setShowPopup(true)}
        style={{ marginBottom: '8px' }}
      >
        <i className="fa-solid fa-plus-large"></i>
        <span>Create group order</span>
      </button>
      <PopupCreateOrder
        showPopup={showPopup}
        closePopup={() => setShowPopup(false)}
        createGO={handleCreateGO}
      />
      <GOList cartList={groupOrder.list} />
    </div>
  );
}

export default GroupOrder;
