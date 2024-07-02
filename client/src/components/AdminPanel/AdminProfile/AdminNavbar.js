import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/AddLink';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function AdminNavbar() {

    return (
        <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, #753a88, #cc2b5e)' }}>
            <div className="navbar-nav d-lg-none w-100 d-flex justify-content-evenly flex-row">
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <HomeIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/links" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <LinkIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/stats" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <AssessmentIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
                <div className="nav-item flex-fill" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/logout" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', width: '100%' }}>
                        <ExitToAppIcon style={{ color: '#ffffff' }} />
                    </Link>
                </div>
            </div>
            

            <div className="navbar-nav w-100 row">
                <div className="col d-none d-lg-flex align-items-center mx-5">
                    <Link to="/" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>
                        Link Vink
                    </Link>
                </div>
                <div className="col-md-auto d-none d-lg-flex d-flex justify-content-end">
                    <div className="nav-item">
                        <Link to="/" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Home
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/links" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Links
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/stats" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh' }}>
                            Stats
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/logout" className="nav-link text-center" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '3vh', marginRight: '5vh' }}>
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
