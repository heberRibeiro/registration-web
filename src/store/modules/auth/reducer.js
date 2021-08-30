import * as types from '../types';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.REGISTER_SUCCESS: {
      const newState = { ...state };
      newState.name = action.payload.user.name;
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
