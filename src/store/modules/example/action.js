import * as types from '../types';

export function clickRequest() {
  return {
    type: types.CLICK_REQUEST,
  };
}

export function clickSuccess() {
  return {
    type: types.CLICK_SUCCESS,
  };
}

export function clickFailure() {
  return {
    type: types.CLICK_FAILURE,
  };
}
