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
    const res = await groupOrderAPI.getGroupOrderByToken(token);
    if (res.message) {
      enqueueSnackbar(res.message, { variant: 'info' });
    }
    navigate('/home-page/group-order');
  };

  useEffect(() => {
    getGO();
  });
  return <div>InvitePage</div>;
}

export default InvitePage;
