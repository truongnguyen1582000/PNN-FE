import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PopupChooseCart({
  closePopup,
  handleAddToMyCart,
  handleAddToGroupCart,
}) {
  const [cart, setCart] = useState();
  const GOcart = useSelector((state) => state.GOcart);

  const handleAddToGO = async () => {
    console.log(cart);
    handleAddToGroupCart(cart);
    closePopup();
  };

  useEffect(() => {
    setCart(GOcart.list[0]._id);
  }, [GOcart]);

  return (
    <div>
      <div className="pop-up">
        <div className="pop-up-content" style={{ width: '480px' }}>
          <div className="pop-up-header">
            <h3>Which cart you want to add?</h3>

            <button
              className="close-popup"
              onClick={() => {
                closePopup();
              }}
            >
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
              onClick={() => {
                handleAddToMyCart();
                closePopup();
              }}
            >
              My cart
            </button>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <select
                id="cart"
                value={cart}
                onChange={(e) => setCart(e.target.value)}
                style={{
                  borderRadius: '47px',
                  padding: '6px',
                }}
              >
                {GOcart.list.map((cart) => (
                  <option key={cart._id} value={cart._id}>
                    {cart.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary go-cart"
                onClick={handleAddToGO}
              >
                Group order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupChooseCart;
