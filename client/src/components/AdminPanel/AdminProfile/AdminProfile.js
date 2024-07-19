import React, { useContext, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import MainIntro from './MainIntro';
import ManageLinks from './CRUDoperations/ManageLinks';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext/authContext';

function AdminProfile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem('authtoken')) {
        navigate('/login');
      } else {
        const userdata = user;
        if (user !== null) {
          localStorage.setItem('username', userdata.username);
        }
      }
    };
    fetchUser();
  }, [navigate, user]); // Include `user` in the dependency array

  return (
    <div>
      <AdminNavbar />
      <MainIntro />
      <ManageLinks />
    </div>
  );
}

export default AdminProfile;
