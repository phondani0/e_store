
import { bindActionCreators } from 'redux';

import * as products from './containers/Products/actions';
import * as navigation from './containers/Navigation/actions';
import * as cart from './containers/Cart/actions';
import * as signup from './containers/Signup/actions';
import * as auth from './containers/Auth/actions';

import {
  push
} from 'connected-react-router'


export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      goTo: (path) => (dispatch) => {
        dispatch(push(path))
      },
      ...products,
      ...navigation,
      ...cart,
      ...auth,
      ...signup,
    },
    dispatch
  );
}
