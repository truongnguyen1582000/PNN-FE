import React, { useEffect, useState } from 'react';
import { productApi } from '../../api/product';
import CreateProductForm from './components/CreateProductForm';
import ProductList from './components/ProductList';

function Shop(props) {
  const [productList, setProductList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const getProductList = async () => {
    try {
      const { data } = await productApi.getMyProduct();
      setProductList(data);
    } catch (error) {}
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="box large-size">
      <button
        className="btn invite-friend create-product-btn"
        onClick={() => setShowPopup(true)}
      >
        <i className="fas fa-plus-circle"></i>
        <span>Create Product</span>
      </button>

      <CreateProductForm
        getProductList={getProductList}
        showPopup={showPopup}
        closePopup={() => setShowPopup(false)}
      />

      <ProductList productList={productList} getProductList={getProductList} />
    </div>
  );
}

export default Shop;
