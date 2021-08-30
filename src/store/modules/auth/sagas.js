import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './action';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/login', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Login efetuado');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (err) {
    toast.error('Usuário e/ou senha inválido(s)');

    yield put(actions.loginFailure());
  }
}

function persisteRehydrate({ payload }) {
  const token = payload.auth.token;

  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { id, name, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', { email, name, password });
      toast.success('Conta alterada com sucesso');
      yield put(actions.registerSuccess({ name, email, password }));
    }
  } catch (e) {
    const errors = e.response.data ? e.response.data.error : [];
    const status = e.response.status ? e.response.status : 0;

    if (errors.lenght) {
      errors.map(error => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }

  // try {
  //   await axios.post('/users/', { name, email, password });

  //   toast.success('Você fez seu cadastro');
  //   history.push('/login');
  // } catch (err) {
  //   const errors = err.response.data.erros;
  //   errors.map(error => toast.error(error));
  // }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persisteRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
