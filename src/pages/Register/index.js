import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    try {
      await axios.post('/users/', { name, email, password });

      toast.success('Você fez seu cadastro');
      history.push('/login');
    } catch (err) {
      const errors = err.response.data.erros;
      errors.map(error => toast.error(error));
    }
  }

  return (
    <Container>
      <h1>Crie sua conta</h1>

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

        <button type='submit'>Criar minha conta</button>
      </Form>
    </Container>
  );
}

export default Register;
