import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { cartApi } from '../../../api/cart';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function PopupInvite({ showPopupInvite, setShowPopupInvite }) {
  const [value, setvalue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [changeComponent, setChangeComponent] = useState(false);

  const [token, setToken] = useState('');

  const getToken = async () => {
    const response = await cartApi.getShareToken({
      cartId: localStorage.getItem('cartId'),
    });

    setToken(response?.data);
  };

  useEffect(
    () => {
      getToken();
    },
    // eslint-disable-next-line
    []
  );

  const link = `localhost:3000/invite/${token}`;

  const handleStartGOrder = async () => {
    try {
      await cartApi.setLimitMoney({
        cartId: localStorage.getItem('cartId'),
        limitMoney: value,
      });
      setChangeComponent(true);
    } catch (error) {
      return enqueueSnackbar(error, { variant: 'error' });
    }

    setvalue('');
  };

  const handleCopyToClipboard = () => {
    enqueueSnackbar('Link copied to clipboard', { variant: 'info' });
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
                onClick={() => {
                  setShowPopupInvite(false);
                  setChangeComponent(false);
                }}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            {!changeComponent && (
              <div>
                <div className="pop-up-body">
                  <div className="pop-up-body-content">
                    <div className="pop-up-body-content-header">
                      <h4>
                        A link will be generated for you to share with your
                        friend
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
            )}

            {changeComponent && (
              <div className="pop-up-body">
                <div className="pop-up-body-content">
                  <p>
                    Share the link below with your friend to invite them to join
                    in your order
                  </p>
                  <input type="text" readOnly value={link} className="token" />
                  <CopyToClipboard text={link} style={{ width: '100%' }}>
                    <button
                      className="copy-btn"
                      onClick={handleCopyToClipboard}
                    >
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PopupInvite;
