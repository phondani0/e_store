import React, { useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { AddShoppingCart } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core';

import {
  Button,
  Drawer,
  Box,
  Typography
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

  const classes = useStyles();

  console.log(props);

  const {
    toggleDrawer,
    isCartOpen
  } = props;

  const anchor = 'right';
  return (
    <React.Fragment key={anchor}>
      <Box
        onClick={toggleDrawer}
        bgcolor="green"
        color="white"
        p={2}
        position="absolute"
        top="40%"
        right={0}
        zIndex="mobile stepper"
        className={classes.cartToggler}
      >
        <Typography>
          <Box display="flex" justifyContent="center">
            <Box pr={1}>
              <AddShoppingCart />
            </Box>
            <Box>
              2 items
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Box px={2} py={1} borderRadius={6} bgcolor="white" color="#399e7f">
              <Typography varient="body2">
                &#8377; 200
              </Typography>
            </Box>
          </Box>
        </Typography>
      </Box>
      <Drawer anchor={anchor} open={isCartOpen} onClose={toggleDrawer}>
        <Box width={400}>
          Cart
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.cart.isCartOpen
  }
}

export default connect(
  mapStateToProps,
  actions
)(Cart);