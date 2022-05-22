import React, { useEffect, useRef, useState } from 'react';

function CreateProductForm({ productInfos, showPopup, closePopup }) {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }

    setPreview(true);
  }, [image]);

  const handleProductInfoChange = (e) => {
    // const { name, value } = e.target;
    // setProductInfos({ ...productInfos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closePopup();
  };

  return (
    <>
      {showPopup && (
        <div className="pop-up">
          <form className="create-product-form box" onSubmit={handleSubmit}>
            <button
              className="close-popup close-popup-btn"
              onClick={() => {
                closePopup();
              }}
              type="reset"
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              className="product-name"
              name="name"
              placeholder="Product Name..."
              id="name"
              value={productInfos.name}
              onChange={handleProductInfoChange}
            />
            <label htmlFor="description">Product Description:</label>
            <input
              type="text"
              className="product-description"
              name="description"
              id="description"
              value={productInfos.description}
              onChange={handleProductInfoChange}
              placeholder="Product Description..."
            />
            <label htmlFor="price">Product Price: (VNĐ)</label>
            <input
              type="input"
              className="price"
              name="price"
              id="price"
              value={productInfos.price}
              onChange={handleProductInfoChange}
              placeholder="Product Price..."
            />
            <div>
              <label
                htmlFor=""
                style={{
                  display: 'inline-block',
                  marginBottom: '16px',
                  marginRight: '4px',
                }}
              >
                Product Image:{' '}
              </label>
              <label htmlFor="image" className="lable-input">
                <i
                  className="fa-solid fa-image"
                  style={{
                    transform: 'translateY(4px)',
                  }}
                ></i>
              </label>
              <input
                type="file"
                className="image-input"
                id="image"
                name="image"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {preview && (
                <div
                  style={{
                    textAlign: 'center',
                    // margin: '0 16px',
                    marginBottom: '16px',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  className="image-preview"
                >
                  <i
                    className="fas fa-times"
                    style={{
                      position: 'absolute',
                      right: '24px',
                      top: '24px',
                      fontSize: '24px',
                      cursor: 'pointer',
                      borderRadius: '50%',
                      border: '1px solid #ccc',
                      padding: '4px 8px',
                    }}
                    onClick={() => setImage(null)}
                  ></i>
                  <img
                    src={productInfos.image}
                    alt=""
                    style={{
                      height: '100%',
                    }}
                  />
                </div>
              )}
            </div>
            <label htmlFor="product-price">Product quantity:</label>
            <input
              type="text"
              className="quantity"
              name="quantity"
              id="quantity"
              value={productInfos.quantity}
              onChange={handleProductInfoChange}
              placeholder="Product quantity..."
            />
            <button
              type="submit"
              className="btn invite-friend create-product-btn"
              style={{
                marginTop: 'auto',
              }}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateProductForm;
