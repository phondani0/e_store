import React from 'react'
import Product from "../containers/Product";
import { Grid } from '@material-ui/core';


export default function ProductList(props) {
  const products = props.products.products || [];
  console.log(products);
  return (
    <Grid container spacing={2}>
      {products.map((product, i) =>
        <Grid key={i} item xs={12} sm={4} lg={3}>
          <Product key={i} product={product} />
        </Grid>
      )}
    </Grid>
  )
}
