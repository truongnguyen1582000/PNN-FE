import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ productList }) {
  return (
    <div className="product-list">
      {productList.map((product) => (
        <ProductItem product={product} key={product._id} />
      ))}
    </div>
  );
}

export default ProductList;
