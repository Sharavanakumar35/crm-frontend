import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import './Landing.css';
import { Button } from 'react-bootstrap';

const Landing = () => {
  const [bgImgClassName, setBgImgClassName] = useState('landingBgImg d-flex justify-content-center');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setBgImgClassName('landingBgImg d-flex justify-content-center');
    }
  }, [location.pathname]);

  const getStarted = () => {
    setBgImgClassName('landingBgImg d-flex justify-content-around');
    navigate('/login');
  };

  return (
    <div className='landingPage-Bg'>
      <div className={bgImgClassName}>
      <h1 className='logo'>
        JobConnect.
      </h1>
        <div className='landingPage-MainAbout'>
          <div>
            <h1>Welcome to JobConnect.</h1>
            <h1 style={{color: '#1a73e8', textShadow: '1px 2px black'}}>Your Ultimate Job Portal CRM</h1>
          </div>
          <p className='mt-3' style={{color: 'red', marginBottom: '0px', fontSize: '1.5rem'}}>Looking for a seamless solution to streamline your recruitment process?</p>
          <p style={{color: 'gray'}}> Look no further than JobConnect, the ultimate Job Portal CRM designed to revolutionize the way you find, manage, and connect with top talent.</p>
          <div className='d-flex justify-content-center'>
            <Button variant="primary" className='mt-3 landingBtn' onClick={getStarted}>
              Get Started
            </Button>
          </div>
        </div>
        <div className='landingPage-outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Landing;
