import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './action';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

// import { pending, rejected, fulfilled } from '../async';
// import loging from '../../../api/login';

function* loginRequest({ payload }) {
  // yield put(actions.login(types.LOGIN_REQUEST, payload));
  // try {
  //   const response = yield loging(payload);
  //   yield put(actions.login('LOGIN_SUCCESS', { ...response.data }));
  //   toast.success('Login efetuado');
  // } catch (error) {
  //   toast.error('Usuário e/ou senha inválido(s)');
  //   yield put(actions.login('LOGIN_FAILURE', payload));
  // }
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

// export function login(email, password) {
//   return dispatch => {
//     dispatch(pending('LOGIN'));
//     Auth.login(email, password)
//       .then(payload => {
//         dispatch(fulfilled('LOGIN', payload));
//         dispatch(replace('/'));
//       })
//       .catch(err => {
//         dispatch(rejected('LOGIN', err));
//       });
//   };
// }

function persisteRehydrate({ payload }) {
  const token = payload.auth.token;

  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, name, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', { email, name, password });
      toast.success('Conta alterada com sucesso');
      yield put(actions.registerUpdatedSuccess({ name, email, password }));
    } else {
      yield call(axios.post, '/users', { email, name, password });
      toast.success('Conta criada com sucesso');
      yield put(actions.registerCreatedSuccess({ name, email, password }));
      history.push('/login');
    }
  } catch (e) {
    const errors = e.response.data ? e.response.data.error : [];
    const status = e.response.status ? e.response.status : 0;

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.lenght) {
      errors.map(error => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persisteRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
