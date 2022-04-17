import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { cartApi } from '../../../api/cart';
import { useSelector } from 'react-redux';

function PopupInvite({ showPopupInvite, setShowPopupInvite }) {
  const [value, setvalue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const currentCart = useSelector((state) => state.cart);

  const handleStartGOrder = async () => {
    try {
      await cartApi.setLimiMoney({
        cartId: currentCart._id,
        limitMoney: value,
      });
      enqueueSnackbar(value, {
        variant: 'success',
        autoHideDuration: 2000,
      });
    } catch (error) {
      return enqueueSnackbar(error, { variant: 'error' });
    }

    setvalue('');
    setShowPopupInvite(false);
  };

  return (
    <>
      {showPopupInvite && (
        <div className="pop-up">
          <div className="pop-up-content">
            <div className="pop-up-header">
              <h3>Invite friend to your group order</h3>
              <button
                className="close-popup"
                onClick={() => setShowPopupInvite(false)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="pop-up-body">
              <div className="pop-up-body-content">
                <div className="pop-up-body-content-header">
                  <h4>
                    A link will be generated for you to share with your friend
                  </h4>
                  <p>Set an order limit for each person:</p>
                </div>
                <input
                  type="number"
                  value={value}
                  placeholder="Enter limit price for person..."
                  step={10000}
                  onChange={(e) => setvalue(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-primary start-order"
              onClick={handleStartGOrder}
            >
              Start group order
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupInvite;
