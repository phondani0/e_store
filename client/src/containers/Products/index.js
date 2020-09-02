import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';

import ProductList from "../../components/ProductList";
import actions from "../../actions";
import Cart from '../Cart';
import Skeleton from 'react-loading-skeleton';

function Products(props) {
  console.log(props)

  useEffect(() => {

    // console.log(props)

    props.fetchProducts();
  }, []);

  return (
    <React.Fragment>
      {props.products
        ?
        <ProductList products={props.products} />
        :
        <Grid container spacing={2}>
          {
            [...Array(10)].map((_, i) => {
              return (
                <Grid key={i} item xs={12} sm={4} lg={3} style={{ marginBottom: '20px' }}>
                  <Skeleton height={134} />
                  <p>
                    <Skeleton width={120} height={25} />
                  </p>
                  <p>
                    <Skeleton width={80} height={20} />
                  </p>
                  <p><Skeleton width={150} height={20} /></p>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginRight: "20px" }}>
                      <Skeleton width={100} height={30} />
                    </div>
                    <div>
                      <Skeleton width={100} height={30} />
                    </div>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
      }
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