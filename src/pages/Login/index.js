/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';
import * as action from '../../store/modules/auth/action';

function Login(props) {
  const dispatch = useDispatch();

  const prevPath = props.location.state ? props.location.state.prevPath : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
    }

    if (formErrors) toast.error('Email e/ou senha inválidos');

    dispatch(action.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Seu email'
        />

        <input
          type='text'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Sua Senha'
        />

        <button type='submit'>Acessar</button>
      </Form>
    </Container>
  );
}

export default Login;
