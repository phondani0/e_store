import React from "react";
import ProductList from "../../components/ProductList";
// import Cart from '../Cart';
import ProductSkeleton from "../../components/ProductSkeleton";
import { useFetchProductsQuery } from "./productsApiSlice";

function Products() {
    const { data: products, error, isLoading } = useFetchProductsQuery({});

    return (
        <React.Fragment>
            {products && products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <ProductSkeleton />
            )}
        </React.Fragment>
    );
}

export default Products;
