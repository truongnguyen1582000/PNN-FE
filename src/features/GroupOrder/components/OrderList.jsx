import React from 'react';
import AddedList from './AddedList';

function OrderList({ list, cartId }) {
  return (
    <div className="go-item box">
      <div className="go-header" style={{ width: '100%' }}>
        {list.info.map((item, index) => (
          <div className="go-item" key={index} style={{ width: '100%' }}>
            <div key={index} className="go-header">
              <img
                src={item.addedBy.avatar}
                alt=""
                width={30}
                height={30}
                className="avatar"
              />
              <p className="name">{item.addedBy.username} </p>
              <p
                style={{
                  marginLeft: '300px',
                }}
              ></p>
            </div>
            <div
              className="go-body"
              style={{
                marginTop: '16px',
              }}
            >
              <AddedList info={item} cartId={cartId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
