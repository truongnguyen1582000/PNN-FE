import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ productList, getProductList }) {
  return (
    <div className="product-list">
      {productList.map((product) => (
        <ProductItem
          product={product}
          key={product._id}
          getProductList={getProductList}
        />
      ))}
    </div>
  );
}

export default ProductList;
