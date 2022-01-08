import React from 'react'; // , { useState }
import { Link } from 'react-router-dom';

import './header.css';

// import { Redirect } from 'react-router-dom';

export function Header(props) {
  const { user, setIsLogin } = props;
  // let [redirectLogin, setRedirectLogin] = useState(false);
  // if (localStorage.getItem('user') == null) {
  //   redirectLogin = false;
  //   return <Redirect to='/' />;
  // }

  // if (redirectLogin) {
  //   redirectLogin = false;
  //   return <Redirect to='/' />;
  // }

  // const user_name = localStorage.getItem('user');
  return (
    <div className='wrapper_header'>
      <div className='title_block_header'>
        <p className='p_in_box'>World Project Search</p>
      </div>
      <div className='name_block_header'>{user.username}</div>
      <Link
        className='logout_button'
        to='/logout'
        onClick={() => {
          setIsLogin(false);
          window.localStorage.clear();
        }}
      >
        Log out
      </Link>
      {/* <button
        onClick={() => {
          // localStorxage.removeItem('user'), setRedirectLogin(true);
        }}
      >
        Log out
      </button> */}
      <div className='age_block_header'>{user.email}</div>
      {/* <div className='cv_block_header'>
        <p>cv.pdf</p>
      </div> */}
    </div>
  );
}
