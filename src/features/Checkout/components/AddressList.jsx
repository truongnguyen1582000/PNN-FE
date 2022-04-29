import { useSnackbar } from 'notistack';
import React from 'react';
import { addressAPI } from '../../../api/address';

function AddressList({ info, selectAddress, getAddress }) {
  const { enqueueSnackbar } = useSnackbar();
  const isEmptyAddress =
    info?.addressList === undefined || info?.addressList.length === 0;
  return (
    <div className="jj">
      {isEmptyAddress && (
        <p
          style={{
            textAlign: 'center',
          }}
        >
          Let's add new address
        </p>
      )}

      {info?.addressList?.length > 0 &&
        info?.addressList?.map((address, index) => {
          return (
            <div
              key={index}
              className="kk"
              onClick={() => {
                selectAddress(index);
              }}
            >
              <input type="radio" id={index} name="address" />
              <label htmlFor={index}>
                <span className="fwb">
                  <span>{address.name}</span>
                  {/* replace first number  = +84 */}
                  <span>{address.phone.replace(/^0+/, '(+84) ')}</span>
                </span>
                {address.addressDetail}
              </label>

              {/* create delete address button */}
              <button
                className="btn btn-danger delete-product delete-address"
                onClick={async () => {
                  try {
                    await addressAPI.deleteAddress(address._id);
                    enqueueSnackbar('Delete address successfully', {
                      variant: 'success',
                    });
                    getAddress();
                  } catch (error) {
                    enqueueSnackbar(error, { variant: 'error' });
                  }
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default AddressList;
