import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';

import {
  makeStyles,
  ButtonGroup,
  Button,
  Drawer,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Backdrop,
  CircularProgress
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({

  'drawer_paper': {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  cart_container: {
    width: '400px',
    padding: '12px',
    paddingTop: '0px',
    paddingBottom: '4rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  cart_toggler: {
    'border-top-left-radius': '5px',
    'border-bottom-left-radius': '5px',
    'background-color': '#399e7f',
    'cursor': 'pointer'
  },
  paper: {
    // padding: theme.spacing(2),
    padding: '.8rem',
    margin: '10px 0',
    width: '100%'
  },
  cart_items_container: {
    height: '100%',
  },
  cart_quantity_inc_dec_button: {
  },
  cart_quantity_text: {
  },
  checkout_btn_wrapper: {
    bottom: 0,
    // width: '380px',
    width: '97%',
    height: '3.5rem',
    position: 'absolute',
    backgroundColor: 'white'
  },
  checkout_btn: {
    left: '.8rem',
    width: '95%',
    bottom: '4%',
    top: '12%',
    [theme.breakpoints.up('md')]: {
      left: '.5rem'
    }
  },
  wrapper: {
    height: '100%',
    position: 'relative',
    'overflow-y': 'scroll'
  },
  productImg: {
    width: '60px',
    height: '60px',
    padding: '0px',
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
    cartItems,
    removeFromCart,
    incrementProductQuantity,
    decrementProductQuantity,
    isLoading
  } = props;

  const anchor = 'right';
  return (
    <React.Fragment key={anchor}>
      <Box
        onClick={toggleCart}
        bgcolor="green"
        color="white"
        p={2}
        position="fixed"
        top="40%"
        right={0}
        zIndex="mobile stepper"
        className={classes.cart_toggler}
      >
        <Box display="flex" justifyContent="center">
          <Box pr={1}>
            <ShoppingCartIcon />
          </Box>
          <Box>
            {cartItems.length} Item{cartItems.length > 1 ? <span>s</span> : <span></span>}
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
      <Drawer classes={{ paper: classes.drawer_paper }} anchor={anchor} open={isCartOpen} onClose={toggleCart}>
        <div className={classes.wrapper}>
          <Box className={classes.cart_container}>
            <Box display="flex" paddingY={1} justifyContent="space-between">
              <Typography
                color="primary"
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <LocalMallIcon />
                <Typography
                  style={{
                    marginLeft: '5px',
                    fontSize: '1.18rem',
                    fontWeight: '600',
                  }}
                >
                  {cartItems.length} Item{cartItems.length > 1 ? <span>s</span> : <span></span>}
                </Typography>
              </Typography>
              <IconButton onClick={toggleCart}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <Box>
              {
                isLoading
                  ?
                  <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  :
                  cartItems.map((item, i) => {
                    return (
                      <Paper key={`c-item-${i}`} className={classes.paper}>
                        <Grid item xs={12} sm container alignItems="center">
                          <Grid item xs container alignItems="center" className={classes.cart_items_container}>
                            <Grid item>
                              <ButtonGroup orientation="vertical" size="small" className={classes.cart_quantity_inc_dec_button}>
                                <Button onClick={() => incrementProductQuantity(item)}>+</Button>
                                <Button disabled={true}>
                                  <Typography className={classes.cart_quantity_text}>{item.quantity}</Typography>
                                </Button>
                                <Button onClick={() => decrementProductQuantity(item)}>-</Button>
                              </ButtonGroup>
                            </Grid>
                            <Grid item xs
                              alignItems="center"
                              justify="center"
                            >
                              <div style={{ textAlign: 'center' }}>
                                <img src={item.product.image} className={classes.productImg} />
                              </div>
                            </Grid>
                            <Grid item xs spacing={3}>
                              <Typography variant="subtitle2">
                                {item.product.name}
                              </Typography>
                              <Typography variant='caption' component="p">
                                &#8377; {item.product.price}
                              </Typography>
                              <Typography variant="subtitle2" color="textSecondary">
                                {item.quantity} X 1 pc(s)
                            </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography variant="subtitle2">&#8377; {item.product.price * item.quantity}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                gutterBottom
                                variant=""
                                style={{ cursor: 'pointer' }}
                                onClick={() => removeFromCart(item)}
                              >
                                <CancelIcon />
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    )
                  })
              }
            </Box>
          </Box>

        </div>
        <div className={classes.checkout_btn_wrapper}>
          <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            className={classes.checkout_btn}
            startIcon={<ShoppingCartIcon />}
          >
            <Typography style={{ paddingRight: '10px' }}>Checkout </Typography>
            <Typography variant="subtitle1" component="h5">&#8377;{cartTotal}</Typography>
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.cart.isCartOpen,
    cartTotal: state.cart.cartTotal,
    cartItems: state.cart.cartItems,
    isLoading: state.cart.isLoading
  }
}

export default connect(
  mapStateToProps,
  actions
)(Cart);