import React, { useState } from 'react';

function PopupCreateOrder({ showPopup, closePopup, createGO }) {
  const [GOName, setGOName] = useState('');
  return (
    <>
      {showPopup && (
        <div className="pop-up">
          <div className="pop-up-content">
            <div className="pop-up-header"></div>
            <div className="pop-up-body">
              <div
                className="pop-up-body-content"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <button
                  className="close-popup"
                  style={{
                    position: 'absolute',
                    top: '-23px',
                    right: '-95px',
                  }}
                  onClick={() => {
                    closePopup();
                    setGOName('');
                  }}
                >
                  <i className="fa-solid fa-times"></i>
                </button>
                <p className="label-go-name">Group name</p>
                <input
                  type="text"
                  value={GOName}
                  placeholder="Enter group name..."
                  onChange={(e) => setGOName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      createGO(GOName);
                      closePopup();
                      setGOName('');
                    }
                  }}
                />
                <button
                  className="invite-friend"
                  style={{
                    marginLeft: 'unset',
                  }}
                  onClick={() => {
                    createGO(GOName);
                    closePopup();
                    setGOName('');
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupCreateOrder;
