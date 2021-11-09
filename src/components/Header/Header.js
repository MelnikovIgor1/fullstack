// import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import './header.css';

import { Redirect } from 'react-router-dom';

export default function Header() {
  let [redirectLogin, setRedirectLogin] = useState(false);
  if (localStorage.getItem('user') == null) {
    redirectLogin = false;
    return <Redirect to='/' />;
  }

  if (redirectLogin) {
    redirectLogin = false;
    return <Redirect to='/' />;
  }

  const user_name = localStorage.getItem('user');
  return (
    <div className='wrapper_header'>
      <div className='title_block_header'>
        <p>Title</p>
      </div>
      <div className='name_block_header'>
        <p>{user_name}</p>
      </div>
      <button
        className='logout_button'
        onClick={() => {
          localStorage.removeItem('user'), setRedirectLogin(true);
        }}
      >
        Log out
      </button>
      <div className='age_block_header'>
        <p>age: 20</p>
      </div>
      <div className='cv_block_header'>
        <p>cv.pdf</p>
      </div>
    </div>
  );
}
