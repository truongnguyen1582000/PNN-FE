import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ productList, getProductList, handleSort, currentSort }) {
  const currentUser = JSON.parse(localStorage.getItem('USER'));
  return (
    <>
      {productList.length > 0 && (
        <div className="sort-product">
          <button
            onClick={() => {
              handleSort();
            }}
            className="btn sort-btn"
          >
            {currentSort === -1
              ? 'Sort by: Price: Low to High'
              : 'Sort by Price: High to Low'}
            {currentSort === -1 ? (
              <i className="fas fa-sort-amount-up" />
            ) : (
              <i className="fas fa-sort-amount-down" />
            )}
          </button>
        </div>
      )}

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
          className="text-center "
          style={{
            marginTop: '20px',
          }}
        >
          <h3
            style={{
              textAlign: 'center',
            }}
          >
            Do you want to sell something ? Let's add new product !{' '}
            {currentUser.username}
          </h3>
        </div>
      )}
    </>
  );
}

export default ProductList;
