// GoogleLoginButton.js

import React from 'react';
import Button from '@material-ui/core/Button';
import gmailIcon from './../../assets/images/Gmail_Logo_512px.png';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
const GoogleLoginButton = () => {
  const navigate = useNavigate() ;
  const handleLogin = () => {
    navigate('/dashboard/reports');
  };
  return (
    
      <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(" heloooooo", credentialResponse);

              localStorage.setItem('token', credentialResponse.credential);
              handleLogin();
}}
            onError={() => {
              console.log('Login Failed');
            }}
          />

  );
};

export default GoogleLoginButton;
