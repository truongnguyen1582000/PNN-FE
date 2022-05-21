import React, { useEffect, useState } from 'react';
import { productApi } from '../../api/product';
import ProductList from '../Shop/components/ProductList';

function Shopping(props) {
  const [productList, setProductList] = useState([]);
  const [sort, setSort] = useState(-1);

  // get product list func with try catch
  const getProductList = async () => {
    try {
      const { data } = await productApi.getProductList();
      setProductList(data);
    } catch (error) {}
  };

  const handleSort = async () => {
    setSort(sort * -1);
    if (sort === -1) {
      setProductList(productList.sort((a, b) => a.price - b.price));
    } else {
      setProductList(productList.sort((a, b) => b.price - a.price));
    }
  };

  useEffect(() => {
    getProductList();
  }, []);
  return (
    <div className="large-size">
      <ProductList
        productList={productList}
        handleSort={handleSort}
        currentSort={sort}
      />
    </div>
  );
}

export default Shopping;
