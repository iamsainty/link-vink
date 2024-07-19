import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import LandingPage from './components/NoAuthPages/LandingPage/LandingPage';
import LoginPage from './components/NoAuthPages/Authentication/Login';
import RegisterPage from './components/NoAuthPages/Authentication/Register';
import AdminPage from './components/AdminPanel/AdminProfile/AdminProfile';
import UserProfile from './components/NoAuthPages/UserProfile/UserProfile';
import LinkState from './components/Context/LinkContext/linkState';
import AuthState from './components/Context/AuthContext/authState';
import Loading from './components/UIcomponent/Loading';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthState>
          <LinkState>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path='/loading' element={<Loading />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/:username" element={<UserProfile />} />
            </Routes>
          </LinkState>
        </AuthState>

      </Router>
    </div>
  );
}

export default App;
