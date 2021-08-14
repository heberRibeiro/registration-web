import { createStore } from 'redux';

const initialState = {
  click: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLICK': {
      const newState = { ...state };
      newState.click = !newState.click;
      return newState;
    }

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
