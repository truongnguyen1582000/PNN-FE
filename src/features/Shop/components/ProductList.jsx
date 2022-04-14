import React from 'react';

function ProductList({ productList }) {
  return (
    <div>
      {productList.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt="" />
          <p>{product.description}</p>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
