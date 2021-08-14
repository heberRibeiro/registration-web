import React from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyle';
import { Title, Paragraph } from './styled';

function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch({ type: 'CLICK' });
  }

  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragraph>Lorem Ipsum Dolor sit amed</Paragraph>
      <button type='button' onClick={handleClick}>
        Botão
      </button>
    </Container>
  );
}

export default Login;
