import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

function Header() {
  const click = useSelector(state => state.exampleReducer.click);

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
      {click ? 'Clicado' : 'Não Clicado'}
    </Nav>
  );
}

export default Header;
