import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ productList, getProductList }) {
  return (
    <>
      {productList.length > 0 ? (
        <div className="product-list">
          {productList.map((product) => (
            <ProductItem
              product={product}
              key={product._id}
              getProductList={getProductList}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center box"
          style={{
            marginTop: '20px',
          }}
        >
          <h3
            style={{
              textAlign: 'center',
            }}
          >
            No product yet !
          </h3>
        </div>
      )}
    </>
  );
}

export default ProductList;
