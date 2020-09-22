import {
  CREATE_ORDER_PENDING,
  CREATE_ORDER_SUCCESS,
  VERIFY_ORDER_SUCCESS,
  SET_ACTIVE_STEP
} from './constants';

const initialState = {
  status: null,
  activeStep: 0
}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload
      }

    case CREATE_ORDER_PENDING:
      return {
        ...state,
        order: null,
        status: null
      }

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload
      }

    case VERIFY_ORDER_SUCCESS:
      return {
        ...state,
        status: "success",
        activeStep: state.activeStep + 1
      }

    default: return state;
  }
}

export default checkoutReducer;