import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { reducer as notifications } from 'react-notification-system-redux';

// import reducers
import productsReducer from './containers/Products/reducer';

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    // notifications,
    products: productsReducer
  });

export default createReducer;
