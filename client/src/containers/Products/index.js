import React from "react";

import ProductList from "../../components/ProductList";
// import Cart from '../Cart';
import ProductSkeleton from '../../components/ProductSkeleton';
import { useFetchProductsQuery } from "./productsApiSlice";

function Products() {
  const { data: products, error, isLoading } = useFetchProductsQuery({});

  console.log("isLoading", isLoading)
  console.log("products", products)
  console.log("error", error)

  return (
    <React.Fragment>
      {products && products.length > 0
        ?
        <ProductList products={products} />
        :
        <ProductSkeleton />
      }
      {/* <Cart /> */}
    </React.Fragment>
  )
}

export default Products;