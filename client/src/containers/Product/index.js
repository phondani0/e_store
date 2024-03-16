import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import { CircularProgress } from '@mui/material';

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    maxHeight: 305,
    [theme.breakpoints.down('xl')]: {
      width: '100%',
      height: 'auto',
      maxHeight: 'inherit'
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    padding: '.6rem 1rem 0',
  }
}));

function Product(props) {

  const classes = useStyles();

  const {
    product,
    addToCart,
    incrementProductQuantity,
    decrementProductQuantity,
    cartItems
  } = props;
  const { name, price, category, description, image } = product;

  // console.log(props);

  const AddToCartBtn = () => {
    const cartItem = cartItems.filter(item => item.product.id === product.id)[0]

    if (product.addToCartLoading) {
      console.log('add to cart loading,,,');
      return (
        <div style={{ marginLeft: '2rem' }}>
          <CircularProgress size={25} />
        </div>
      );
    }
    else if (cartItem) {
      return (
        <ButtonGroup size="small">
          <Button onClick={() => incrementProductQuantity(cartItem)}>+</Button>
          <Button disabled={true}>
            <Typography>{cartItem.quantity}</Typography>
          </Button>
          <Button onClick={() => decrementProductQuantity(cartItem)}>-</Button>
        </ButtonGroup>
      )
    } else {
      return (
        <IconButton size="small" color="primary" onClick={() => addToCart(product)}>
          <LocalMallIcon></LocalMallIcon> Cart
        </IconButton>
      )
    }
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom component="h2" variant="h6">
          {name}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          &#8377; {price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        {

          <AddToCartBtn />

        }
      </CardActions>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  }
}

export default connect(mapStateToProps, actions)(Product);