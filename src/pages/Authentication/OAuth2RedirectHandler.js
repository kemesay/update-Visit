import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const location = useLocation();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const token = getUrlParameter('token');
        const error = getUrlParameter('error');

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            // Redirect to "/profile" if a token is present
            window.location.href = "/profile";
        } else {
            // Redirect to "/login" with error if no token is present
            window.location.href = `/login?error=${error}`;
        }
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Render null because the redirection is handled in the useEffect
    return null;
};

export default OAuth2RedirectHandler;
