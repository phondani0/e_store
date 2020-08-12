import { SIGNUP_CHANGE, SIGNUP_RESET } from './constants';

const initialState = {
  signupFormData: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_CHANGE:
      return {
        ...state,
        signupFormData: { ...state.signupFormData, ...action.payload }
      }
    case SIGNUP_RESET:
      return {
        ...state,
        signupFormData: { ...initialState.signupFormData }
      }
    default:
      return state;
  }
};

export default signupReducer;