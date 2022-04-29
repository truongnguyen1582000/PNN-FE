import React, { useState } from 'react';
import { addressAPI } from '../../../api/address';
import { useSnackbar } from 'notistack';

function AddressForm({ closePop, getAddress }) {
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleAddNewAddress = async () => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (address.name.length < 6 && address.name !== '') {
      return enqueueSnackbar('Name too short', {
        variant: 'error',
      });
    }
    if (!regexPhoneNumber.test(address.phone) && address.phone !== '') {
      return enqueueSnackbar('Your phone number is invalid', {
        variant: 'error',
      });
    }

    // prevent address detail smaller than 30 characters
    if (address.address.length < 30 && address.address !== '') {
      return enqueueSnackbar('Address too short', {
        variant: 'error',
      });
    }

    try {
      const info = {
        name: address.name,
        phone: address.phone,
        addressDetail: address.address,
      };
      await addressAPI.createAddress({ info: info });
      enqueueSnackbar('Create new address successfully', {
        variant: 'success',
      });
      closePop();
      getAddress();
    } catch (error) {
      console.log({ error });
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <div>
      <div className="name-and-sdt">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className="a-name"
            placeholder="Your name"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="phone">Phone number:</label>
          <input
            id="phone"
            type="text"
            className="phone-number"
            placeholder="Your phone number"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
        </div>
      </div>
      <div className="detail-address-wrap">
        <label htmlFor="detail-address">Address details:</label>
        <textarea
          name=""
          id="detail-address"
          cols="30"
          rows="4"
          className="aa"
          placeholder="Address details"
          value={address.address}
          onChange={(e) => {
            setAddress({ ...address, address: e.target.value });
          }}
        ></textarea>
      </div>
      <div className="btn-wraper">
        <button
          onClick={handleAddNewAddress}
          className="btn invite-friend add-new-address"
        >
          Add
        </button>
        <button
          onClick={() => closePop()}
          className="btn invite-friend add-new-address cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddressForm;
