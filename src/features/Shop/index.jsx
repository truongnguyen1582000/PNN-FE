import React, { useEffect, useState } from 'react';
import { productApi } from '../../api/product';
import CreateProductForm from './components/CreateProductForm';
import ProductList from './components/ProductList';
import OrderForShop from './components/OrderForShop';

function Shop(props) {
  const [productList, setProductList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [sort, setSort] = useState(-1);

  const getProductList = async () => {
    try {
      const { data } = await productApi.getMyProduct();
      setProductList(data);
    } catch (error) {}
  };

  useEffect(() => {
    getProductList();
  }, []);

  const handleSort = async () => {
    setSort(sort * -1);
    if (sort === -1) {
      setProductList(productList.sort((a, b) => a.price - b.price));
    } else {
      setProductList(productList.sort((a, b) => b.price - a.price));
    }
  };

  return (
    <>
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

        <ProductList
          productList={productList}
          getProductList={getProductList}
          handleSort={handleSort}
          currentSort={sort}
        />
      </div>
      <div className="box large-size">
        <OrderForShop />
      </div>
    </>
  );
}

export default Shop;
