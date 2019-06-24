import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from './Logout';

const NavigationNoAuth = () => (
  <ul>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Register</Link></li>
  </ul>
);

const NavigationWithAuth = () => (
  <ul>
    <li><Link to="/profile">Profile</Link></li>
    <li><Link to="/hidden">Hidden</Link></li>
    <li><LogoutButton /></li>
  </ul>
);

const Navigation = ({ session }) => (
  <div>
    { session && session.me ? <NavigationWithAuth /> : <NavigationNoAuth /> }
  </div>
);

export default Navigation;