import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductList from "../../components/ProductList";
import actions from "../../actions";
import Cart from '../Cart';
import ProductSkeleton from '../../components/ProductSkeleton';

function Products({ products, fetchProducts }) {
  console.log(products)

  useEffect(() => {

    console.log(products)

    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      {products.length > 0
        ?
        <ProductList products={products} />
        :
        <ProductSkeleton />
      }
      <Cart />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    products: state.product.products
  }
}

export default connect(
  mapStateToProps,
  actions
)(Products);