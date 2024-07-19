import React from 'react';
import { Link } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import ContactsIcon from '@mui/icons-material/Contacts';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, #753a88, #cc2b5e)' }}>
            {/* Mobile view */}
            <div className="navbar-nav d-lg-none w-100 d-flex justify-content-between flex-row">
                <div className="nav-item">
                    <Link to="/" className="nav-link" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh', fontWeight: 'bold' }}>
                        Link Vink
                    </Link>
                </div>
                {/* <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <HomeIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/features" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <InfoIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/pricing" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <MonetizationOnIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/testimonials" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <FeedbackIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/contact" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <ContactsIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/signup" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <PersonAddIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/login" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <ExitToAppIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div> */}
            </div>

            {/* Desktop view */}
            <div className="navbar-nav d-none d-lg-flex w-100 row">
                <div className="col align-items-start mx-5">
                    <Link to="/" className="nav-link" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>
                        Link Vink
                    </Link>
                </div>
                <div className="col-md-auto d-flex justify-content-end">
                    <div className="nav-item">
                        <Link to="/" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Home
                        </Link>
                    </div>
                    {/* <div className="nav-item">
                        <Link to="/features" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Features
                        </Link>
                    </div> */}
                    {/* <div className="nav-item">
                        <Link to="/pricing" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Pricing
                        </Link>
                    </div> */}
                    {/* <div className="nav-item">
                        <Link to="/testimonials" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Testimonials
                        </Link>
                    </div> */}
                    {/* <div className="nav-item">
                        <Link to="/contact" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Contact
                        </Link>
                    </div> */}
                    <div className="nav-item">
                        <Link to="/register" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Register
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/login" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh', marginRight: '5vh' }}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
