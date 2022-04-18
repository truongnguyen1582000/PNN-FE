import React from 'react';
import { useDispatch } from 'react-redux';
import { cartApi } from '../../../api/cart';
import { useSnackbar } from 'notistack';
import { setCart } from '../../Cart/CartSlice';

function ProductItem({ product }) {
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const isMyProduct = currentUser._id === product.shopOwner._id;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getCart = async () => {
    const response = await cartApi.getCart();
    dispatch(setCart(response?.data?.cartItems));
  };

  const handleAddToCart = async () => {
    try {
      await cartApi.addToCart({
        productId: product._id,
      });
      enqueueSnackbar('Add to cart successfully', {
        variant: 'success',
      });
      await getCart();
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
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

        {!isMyProduct && (
          <div className="add-to-cart" onClick={handleAddToCart}>
            <button className="btn btn-primary">Add to cart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
