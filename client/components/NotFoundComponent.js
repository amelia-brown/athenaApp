import React from 'react';
import { Link } from 'react-router';

const NotFoundComponent = () => (
  <div className='login-container'>
    <div className='login'>
      <div className='loginSignupContainer'>
      <div>
        <h1 className='title'>NOT FOUND</h1><br />
        <p className='subtitle'>Sorry. You are either not authorized to view this page or the page does not exist.</p>
        <div className='button-right-float'>
          <Link to='/'><button className='read-more'>Home</button></Link>
        </div>
      </div>
      </div>
    </div>
  </div>
);

export default NotFoundComponent;
