import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <>
      <h2>This is the admin dashboard</h2>
      <Outlet />
    </>
  );
};

export default AdminLayout;