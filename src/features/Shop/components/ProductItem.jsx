import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../../../api/cart';
import { useSnackbar } from 'notistack';
import { getCart } from '../../Cart/CartSlice';
import PopupChooseCart from '../../Shopping/components/PopupChooseCart';
import { groupOrderAPI } from '../../../api/groupOrder';
import { productApi } from '../../../api/product';
import EditProductForm from './EditProductForm';

function ProductItem({ product, getProductList }) {
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  const isMyProduct = currentUser._id === product.shopOwner._id;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const GOcart = useSelector((state) => state.GOcart);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const getCartData = async () => {
    await dispatch(getCart());
  };

  useEffect(
    () => {
      getCartData();
    },
    // eslint-disable-next-line
    []
  );

  const handleAddToCart = async () => {
    if (GOcart.list.length !== 0) {
      return setShowPopup(true);
    }
    try {
      await cartApi.addToCart({
        productId: product._id,
      });
      enqueueSnackbar('Add to cart successfully', {
        variant: 'success',
      });
      await getCartData();
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  // const handleGetGroupOrder = async () => {
  //   dispatch(getGroupOrderCart());
  // };

  const handleAddToMyCart = async () => {
    try {
      await cartApi.addToCart({
        productId: product._id,
      });
      enqueueSnackbar('Add to cart successfully', {
        variant: 'success',
      });
      await getCartData();
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  const handleAddToGroupCart = async (id) => {
    try {
      await groupOrderAPI.addToGO(id, {
        productId: product._id,
      });
      enqueueSnackbar(`Add product to group order successfully`, {
        variant: 'success',
      });
      await getCartData();
    } catch (error) {
      enqueueSnackbar('Group order cart is closed', {
        variant: 'error',
      });
    }
  };

  return (
    <div>
      {product && (
        <div className="product-item box">
          <img src={product.image} alt="" />
          <div className="bottom">
            <div
              style={{
                width: '100%',
              }}
            >
              <p>{product.name}</p>
              <p>
                {product.price
                  .toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                  .replace('VND', '₫')}
              </p>
            </div>
            {/* delete product button */}
            <div>
              {isMyProduct && (
                <button
                  className="btn btn-danger delete-product edit-product"
                  style={{
                    height: '30px',
                    marginRight: '8px',
                  }}
                  onClick={async () => {
                    setShowPopup2(true);
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              )}
              {isMyProduct && (
                <button
                  className="btn btn-danger delete-product"
                  style={{
                    height: '30px',
                  }}
                  onClick={async () => {
                    try {
                      await productApi.deleteProduct(product._id);
                      enqueueSnackbar('Delete product successfully', {
                        variant: 'success',
                      });
                      await getProductList();
                    } catch (error) {
                      enqueueSnackbar(error.message, {
                        variant: 'error',
                      });
                    }
                  }}
                >
                  <i className="fa-solid fa-trash-alt"></i>
                </button>
              )}
            </div>
          </div>

          {!isMyProduct && (
            <div className="add-to-cart" onClick={handleAddToCart}>
              <button className="btn btn-primary">Add to cart</button>
            </div>
          )}
          {showPopup && (
            <PopupChooseCart
              closePopup={() => setShowPopup(false)}
              handleAddToMyCart={handleAddToMyCart}
              handleAddToGroupCart={handleAddToGroupCart}
            />
          )}
          <EditProductForm
            getProductList={getProductList}
            showPopup={showPopup2}
            closePopup={() => setShowPopup2(false)}
            productInfos={product}
          />
        </div>
      )}
    </div>
  );
}

export default ProductItem;
