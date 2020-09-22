import {
  CREATE_ORDER_SUCCESS
} from './constants';

const initialState = {}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload
      }

    default: return state;
  }
}

export default checkoutReducer;