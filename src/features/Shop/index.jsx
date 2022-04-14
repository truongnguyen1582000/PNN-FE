import React, { useEffect, useState } from 'react';
import { productApi } from '../../api/product';
import CreateProductForm from './components/CreateProductForm';
import ProductList from './components/ProductList';

function Shop(props) {
  const [productList, setProductList] = useState([]);

  // get product list func with try catch
  const getProductList = async () => {
    try {
      const { data } = await productApi.getProductList();
      setProductList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="box">
      <CreateProductForm />
      <ProductList productList={productList} />
    </div>
  );
}

export default Shop;
