import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { groupOrderAPI } from '../../api/groupOrder';
import { useSnackbar } from 'notistack';

function InvitePage(props) {
  const location = useLocation();
  const token = location.pathname.split('/').pop();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const getGO = async () => {
    try {
      const res = await groupOrderAPI.getGroupOrderByToken(token);
      console.log(res);
      if (res.message) {
        enqueueSnackbar(res.message, { variant: 'info' });
      }
      navigate('/home-page/group-order');
    } catch (error) {
      if (error === 'invalid signature') {
        enqueueSnackbar('Invalid token', { variant: 'info' });
        navigate('/home-page/group-order');
        return;
      }
      if (error === 'A token is required for authentication') {
        enqueueSnackbar('Please login first', { variant: 'info' });
        navigate('/');
      }
    }
  };

  useEffect(() => {
    getGO();
  });
  return <div>InvitePage</div>;
}

export default InvitePage;
