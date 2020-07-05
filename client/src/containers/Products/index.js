import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductList from "../../components/ProductList";
import actions from "../../actions";

function Products(props) {
  console.log(props)

  useEffect(() => {

    console.log(props)

    props.fetchProducts();
  }, []);

  return (
    <ProductList products={props.products} />
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