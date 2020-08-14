import { LOGIN_CHANGE, LOGIN_RESET } from './constants';

const initialState = {
  loginFormData: {
    email: '',
    password: ''
  }
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_CHANGE:
      return {
        ...state,
        loginFormData: { ...state.loginFormData, ...action.payload }
      }
    case LOGIN_RESET:
      return {
        ...state,
        loginFormData: { ...initialState.loginFormData }
      }
    default:
      return state;
  }
};

export default loginReducer;