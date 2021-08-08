import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';

import { Nav } from './styled';

function Header() {
  return (
    <Nav>
      <a href='/'>
        <FaHome />
      </a>
      <a href='/'>
        <FaSignInAlt />
      </a>
      <a href='/'>
        <FaUserAlt />
      </a>
    </Nav>
  );
}

export default Header;
