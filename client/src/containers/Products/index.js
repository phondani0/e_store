import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductList from "../../components/ProductList";
import actions from "../../actions";
import Cart from '../Cart';

function Products(props) {
  console.log(props)

  useEffect(() => {

    console.log(props)

    props.fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <ProductList products={props.products} />
      <Cart />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(
  mapStateToProps,
  actions
)(Products);