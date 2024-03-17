import React from "react";
import Product from "../containers/Product";
import { Grid } from "@mui/material";

export default function ProductList(props) {
  const products = props.products;
  // console.log(products);
  return (
    <Grid container spacing={2}>
      {products.map((product, i) => (
        <Grid key={i} item xs={12} sm={4} lg={3}>
          {/* We should never use the Container here, or the component with business logic. */}
          <Product key={i} product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
