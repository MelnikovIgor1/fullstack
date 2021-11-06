// import { Link } from 'react-router-dom';
import React from 'react';

import './header.css';

import { Redirect } from 'react-router-dom';

export default function Header() {
  if (localStorage.getItem('user') == null) {
    return <Redirect to='/' />;
  }
  const user_name = localStorage.getItem('user');
  // const { name } = props;
  return (
    // <>
    <div className='wrapper_header'>
      <div className='title_block_header'>
        <p>Title</p>
      </div>
      <div className='name_block_header'>
        <p>{user_name}</p>
      </div>
      <div className='age_block_header'>
        <p>age: 20</p>
      </div>
      <div className='cv_block_header'>
        <p>cv.pdf</p>
      </div>
      {/* <h1>fgg</h1> */}
      {/* </div> */}
    </div>
    // </>
  );
}
