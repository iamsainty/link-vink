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
import ErrorPage from './components/NoAuthPages/ErrorPage';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthState>
          <LinkState>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/u/:username" element={<UserProfile />} />
              <Route exact path="*" element={<ErrorPage />} />
            </Routes>
          </LinkState>
        </AuthState>

      </Router>
    </div>
  );
}

export default App;
