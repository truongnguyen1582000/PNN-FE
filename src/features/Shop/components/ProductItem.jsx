import React from 'react';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../Cart/CartSlice';

function ProductItem({ product }) {
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const isMyProduct = currentUser._id === product.shopOwner._id;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addTocart(product));
  };

  return (
    <div>
      <div className="product-item box">
        <img src={product.image} alt="" />
        <div className="bottom">
          <p>{product.name}</p>
          <p>
            {product.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        </div>

        <div className="add-to-cart">
          {!isMyProduct && (
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
