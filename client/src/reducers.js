import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { reducer as notifications } from 'react-notification-system-redux';

// import reducers
import productsReducer from './containers/Products/reducer';
import navigationReducer from './containers/Navigation/reducer';
import cartReducer from './containers/Cart/reducer';
import authReducer from './containers/Auth/reducer';
import signupReducer from './containers/Signup/reducer';
import loginReducer from './containers/Login/reducer';

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    // notifications,
    product: productsReducer,
    navigation: navigationReducer,
    cart: cartReducer,
    auth: authReducer,
    signup: signupReducer,
    login: loginReducer
  });

export default createReducer;
