import React from 'react';
import OrderList from './OrderList';

function GOitem({ item }) {
  return (
    <div className="go-item box">
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
      </div>
      <div className="go-body">
        <OrderList list={item.info} />
      </div>
    </div>
  );
}

export default GOitem;
