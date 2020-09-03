import React from 'react'
import Product from "../containers/Product";
import { Grid } from '@material-ui/core';

import { useState, useEffect } from 'react';

export default function ProductList(props) {
  const products = props.products;
  // console.log(products);
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
