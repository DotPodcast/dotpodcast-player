import makeTypes from '../utils/makeTypes';

export const types = makeTypes([
  'USER_TOUCHED',
]);

export const actions = {
  userTouched: () => {
    return {
      type: types.USER_TOUCHED
    }
  },
};

const defaultState = {
  touched: false,
};

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case types.USER_TOUCHED:
      return {
        ...state,
        touched: true
      }
    default:
      return state;
  }
};

export default reducer;
