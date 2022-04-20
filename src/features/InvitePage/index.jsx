import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function InvitePage(props) {
  const location = useLocation();
  const token = location.pathname.split('/').pop();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCart = async () => {
    try {
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(
    () => {
      getCart();
    },
    // eslint-disable-next-line
    []
  );

  return <div>InvitePage</div>;
}

export default InvitePage;
