import { call, put, all, takeLatest } from 'redux-saga/effects';
// import { toast } from 'react-toastify';
import * as actions from './action';

import * as types from '../types';

const request = () =>
  new Promise((resolve /* , reject */) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

function* exampleRequest() {
  try {
    yield call(request);
    yield put(actions.clickSuccess());
  } catch (error) {
    // toast.error('Deu erro');
    yield put(actions.clickFailure());
  }
}

export default all([takeLatest(types.CLICK_REQUEST, exampleRequest)]);
