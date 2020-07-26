import React from 'react'
import Product from "../containers/Product";
import { Grid } from '@material-ui/core';


export default function ProductList(props) {
  const products = props.products.products || [];
  console.log(products);
  return (
    <Grid container spacing={2}>
      {products.map((product, i) =>
        <Grid key={i} item>
          <Product key={i} product={product} />
        </Grid>
      )}
    </Grid>
  )
}
