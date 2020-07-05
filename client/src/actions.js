
import { bindActionCreators } from 'redux';

import * as products from './containers/Products/actions';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...products
    },
    dispatch
  );
}
