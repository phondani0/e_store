import { SET_AUTH, RESET_AUTH } from './constants';

const initialState = {
  isAuth: false,
  user: null,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        isAuth: true,
        user: action.payload.user,
        token: action.payload.token
      }
    case RESET_AUTH:
      return initialState
    default:
      return state;
  }
}

export default authReducer;