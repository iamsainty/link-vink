import React, { useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import MainIntro from './MainIntro'
import { useNavigate } from 'react-router-dom';
import ManageLinks from './CRUDoperations/ManageLinks';

function AdminProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem('authtoken')) {
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);
  return (
    <div>
      <AdminNavbar/>
      <MainIntro/>
      <ManageLinks/>
    </div>
  )
}

export default AdminProfile
