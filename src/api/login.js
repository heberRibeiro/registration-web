import { call } from 'redux-saga/effects';
import axios from '../services/axios';
import history from '../services/history';

export default function* login(payload) {
  const response = yield call(axios.post, '/login', payload);

  axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  history.push(payload.prevPath);

  return response;
}
