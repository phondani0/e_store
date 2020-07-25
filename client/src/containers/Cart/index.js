import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { AddShoppingCart } from '@material-ui/icons';

import {
  makeStyles,
  ButtonBase,
  Drawer,
  Box,
  Typography,
  Grid,
  Paper
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  'cartToggler': {
    'border-top-left-radius': '5px',
    'border-bottom-left-radius': '5px',
    'background-color': '#399e7f',
    'cursor': 'pointer'
  }
}));


function Cart(props) {


  useEffect(() => {
    props.fetchCart();
  }, []);

  const classes = useStyles();

  console.log(props);

  const {
    toggleCart,
    isCartOpen,
    cartTotal,
    cartItems
  } = props;

  const anchor = 'right';
  return (
    <React.Fragment key={anchor}>
      <Box
        onClick={toggleCart}
        bgcolor="green"
        color="white"
        p={2}
        position="absolute"
        top="40%"
        right={0}
        zIndex="mobile stepper"
        className={classes.cartToggler}
      >
        <Box display="flex" justifyContent="center">
          <Box pr={1}>
            <AddShoppingCart />
          </Box>
          <Box>
            {cartItems.length} items
            </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Box px={2} py={1} borderRadius={6} bgcolor="white" color="#399e7f">
            <Typography>
              &#8377; {cartTotal}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Drawer anchor={anchor} open={isCartOpen} onClose={toggleCart}>
        <Box width={400}>
          <Box >
            {
              cartItems.map((item, i) => {
                return (
                  <Paper key={`c-item-${i}`} className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item>
                        {/* <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                  </ButtonBase> */}
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                              {item.product.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                              Remove
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">$19.00</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                )
              })
            }
          </Box>
        </Box>
      </Drawer>
    </React.Fragment >
  );
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.cart.isCartOpen,
    cartTotal: state.cart.cartTotal,
    cartItems: state.cart.cartItems
  }
}

export default connect(
  mapStateToProps,
  actions
)(Cart);