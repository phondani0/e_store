
import { bindActionCreators } from 'redux';

import * as products from './containers/Products/actions';
import * as navigation from './containers/Navigation/actions';
import * as cart from './containers/Cart/actions';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...products,
      ...navigation,
      ...cart
    },
    dispatch
  );
}
