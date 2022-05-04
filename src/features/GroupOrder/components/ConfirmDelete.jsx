import React from 'react';

function ConfirmDelete({ closePopup, handleDeleteItem }) {
  return (
    <div className="pop-up">
      <div className="pop-up-content" style={{ width: '270px' }}>
        <div className="pop-up-header">
          <h3>Are you sure you want to delete this item</h3>

          <button className="close-popup" onClick={() => closePopup()}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        <div
          className="pop-up-body"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}
        >
          <button
            className="btn btn-primary go-cart"
            style={{
              width: '100px',
              backgroundColor: 'green',
            }}
            onClick={() => {
              handleDeleteItem();
              closePopup();
            }}
          >
            Yes
          </button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <button
              className="btn btn-primary go-cart"
              onClick={() => closePopup()}
              style={{
                width: '100px',
                backgroundColor: 'red',
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
