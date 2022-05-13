import React, { useEffect, useState } from 'react';
import { productApi } from '../../api/product';
import ProductList from '../Shop/components/ProductList';

function Shopping(props) {
  const [productList, setProductList] = useState([]);

  // get product list func with try catch
  const getProductList = async () => {
    try {
      const { data } = await productApi.getProductList();
      setProductList(data);
    } catch (error) {}
  };

  useEffect(() => {
    getProductList();
  }, []);
  return (
    <div className="large-size">
      <ProductList productList={productList} />
    </div>
  );
}

export default Shopping;
