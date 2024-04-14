import { bindActionCreators } from "redux";

import * as product from "./containers/products/actions";
import * as navigation from "./containers/Navigation/actions";
import * as cart from "./containers/Cart/actions";
import * as auth from "./containers/Auth/actions";
import * as signup from "./containers/Signup/actions";
import * as login from "./containers/Login/actions";
import * as checkout from "./containers/Checkout/actions";

export default function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            // goTo: (path) => (dispatch) => {
            //   dispatch(push(path))
            // },
            ...product,
            ...navigation,
            ...cart,
            ...auth,
            ...signup,
            ...login,
            ...checkout,
        },
        dispatch
    );
}
