import React from 'react';
import { useLocation } from 'react-router-dom';

function InvitePage(props) {
  const location = useLocation();
  const pathname = location.pathname.split('/').pop();
  console.log(pathname);
  return <div>InvitePage</div>;
}

export default InvitePage;
