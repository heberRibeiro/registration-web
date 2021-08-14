import * as types from '../types';

const initialState = {
  click: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLICK_SUCCESS: {
      const newState = { ...state };
      newState.click = !newState.click;
      console.log('Sucesso');
      return newState;
    }

    case types.CLICK_FAILURE: {
      console.log('Erro na requisição');
      return state;
    }

    case types.CLICK_REQUEST: {
      console.log('Realizando a requisição');
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
