import React from 'react';
import { LoginBlock, RegistrationBlock } from './LoginBlock';

export function LoginPage(props) {
  const { isLogin, setIsLogin } = props;
  console.log('type_: ', typeof setIsLogin, typeof isLogin, props);
  return (
    <div className='wrapper'>
      <div>
        <h1>Welcome Aboard</h1>
      </div>
      <LoginBlock setIsLogin={setIsLogin} />
    </div>
  );
}

export function RegistrationPage(props) {
  const { isLogin, setIsLogin } = props;
  console.log('type_: ', typeof setIsLogin, typeof isLogin);
  return (
    <div className='wrapper'>
      <div>
        <h1>Welcome Aboard</h1>
      </div>
      <RegistrationBlock setIsLogin={setIsLogin} />
    </div>
  );
}
