import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Nav } from './styled';

function Header() {
  return (
    <Nav>
      <Link to='/'>
        <FaHome />
      </Link>
      <Link to='/login'>
        <FaSignInAlt />
      </Link>
      <Link to='/'>
        <FaUserAlt />
      </Link>
    </Nav>
  );
}

export default Header;
