import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as action from '../../store/modules/auth/action';

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading } = useSelector(state => state.auth);
  const { id, name: userName, email: userEmail } = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!id) return;
    setName(userName);
    setEmail(userEmail);
  }, [id, userName, userEmail]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracters');
    }

    if (!isEmail(email)) {
      toast.error('Email inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 3 e 255 caracters');
    }

    if (formErrors) return;

    dispatch(action.registerRequest({ name, email, password, id }));
  }

  return (
    <Container>
      <h1>{id ? 'Editar Dados' : 'Criar sua conta'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Nome:
          <input
            type='text'
            value={name}
            placeholder='Seu nome'
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label htmlFor='email'>
          Email:
          <input
            type='text'
            value={email}
            placeholder='Seu email'
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor='password'>
          Nome:
          <input
            type='text'
            value={password}
            placeholder='Sua senha'
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <button type='submit'>Salvar</button>
      </Form>
    </Container>
  );
}

export default Register;
