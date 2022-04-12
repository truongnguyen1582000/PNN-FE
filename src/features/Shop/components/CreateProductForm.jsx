import React, { useEffect, useRef, useState } from 'react';
import { uploadAvatar } from '../../../api/cloudinary';
import { productApi } from '../../../api/product';

function CreateProductForm(props) {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const [productInfos, setProductInfos] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
  });

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
  }, [image]);

  const handleProductInfoChange = (e) => {
    const { name, value } = e.target;
    setProductInfos({ ...productInfos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productInfos);
    console.log(image);

    if (image) {
      const { data } = await uploadAvatar(image);
      await productApi.createProduct({
        productInfos,
        image: data.url,
      });
      setProductInfos({
        name: '',
        price: '',
        description: '',
        quantity: '',
      });
      setImage(null);
    } else {
      await productApi.createProduct({
        productInfos,
      });
      setProductInfos({
        name: '',
        price: '',
        description: '',
        quantity: '',
      });
      setImage(null);
    }
  };

  return (
    <form className="create-product-form box" onSubmit={handleSubmit}>
      <label htmlFor="name">Product Name:</label>
      <input
        type="text"
        className="product-name"
        name="name"
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
      />
      <label htmlFor="price">Product Price:</label>
      <input
        type="text"
        className="price"
        name="price"
        id="price"
        value={productInfos.price}
        onChange={handleProductInfoChange}
      />
      <div>
        <label htmlFor="image" className="lable-input">
          <i className="fa-solid fa-image"></i>
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
              margin: '0 16px',
              borderRadius: '8px',
              boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
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
            <img src={preview} alt="" style={{ width: '100%' }} />
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
      />

      <button type="submit" className="create-product-btn">
        Create
      </button>
    </form>
  );
}

export default CreateProductForm;
